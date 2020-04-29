import React, { Component } from 'react';
import AceEditor from "react-ace";
import backend from '../api/backend';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-eclipse";
import { Button } from 'react-bootstrap';

class Editor extends Component {
    constructor() {
        super();
        this.state = {
            theme: "monokai",
            font: 14,
            value: `
import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner s=new Scanner(System.in);
        int n=s.nextInt();
        for(int i=0;i<n;i++){
            System.out.print("*");
        }
    }
}
            `,
            mode: "java",
            output: "",
            input: ""
        }
    }

    handleChange = (event) => {
        this.setState({ mode: event.target.value });
    }

    ChangeTheme = (event) => {
        this.setState({ theme: event.target.value })
    }

    onChangeValue = (newValue) => {
        this.setState({ value: newValue })
    }
    onInputChange = (event) => {
        this.setState({ input: event.target.value });
        //console.log(event.target.value);
    }
    run = async () => {
        const response = await backend.post('/run', { code: this.state.value, mode: this.state.mode, givenInput: this.state.input });
        this.setState({ output: response.data });
    }

    render() {
        return (
            <div>
                <div className="container-fluid" id="buttons" style={{ marginRight: "10px" }}>
                    <select className="btn btn-outline-dark dropdown-toggle" style={{ marginLeft: "10px", marginBottom: "10px" }} value={this.state.mode} onChange={this.handleChange}>
                        <option value="java">java</option>
                        <option value="c_cpp">c_cpp</option>
                    </select>

                    <select className="btn btn-outline-dark dropdown-toggle" style={{ marginLeft: "10px", marginBottom: "10px" }} value={this.state.theme} onChange={this.ChangeTheme}>
                        <option value="eclipse">eclipse</option>
                        <option value="terminal">terminal</option>
                        <option value="monokai">monokai</option>
                        <option value="github">github</option>
                    </select>
                    <button className="btn btn-outline-dark" style={{ marginLeft: "10px", marginBottom: "10px" }} onClick={this.run}>run</button>
                    <button className="btn btn-outline-dark" style={{ marginLeft: "10px", marginBottom: "10px" }} >Get Answer</button>
                </div>
                <div className="container-fluid ">
                    <AceEditor className="border border-dark rounded-lg" style={{ marginLeft: "10px" }}
                        mode={this.state.mode}
                        theme={this.state.theme}
                        onChange={this.onChangeValue}
                        name="UNIQUE_ID_OF_DIV"
                        value={this.state.value}
                        height="60vh"
                        width="78vh"
                        editorProps={{ $blockScrolling: true }}
                        fontSize={this.state.font}
                    />
                </div>
                <div style={{ marginLeft: "25px", marginTop: "5px", width: "78vh" }} className="form-group ">
                    <label for="Textarea" >Your Input goes here!!!</label>
                    <textarea id="Textarea" className="form-control border border-dark" value={this.state.input} rows="3" onChange={this.onInputChange}></textarea>
                </div>
                <div>
                    <div className="card mt-2 rounded" style={{ marginLeft: "25px", marginTop: "5px", width: "78vh" }} id="output">
                        <div className="card-header">
                            Output
                        </div>
                        <div className="card-body">
                            <pre className="card-text">{this.state.output}</pre>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Editor;