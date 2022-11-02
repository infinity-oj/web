import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import "./App.css";
import { Resizable } from "re-resizable";
import ResizeObserver from "react-resize-observer";
import c from "ansi-colors";

import { AttachAddon } from "xterm-addon-attach";

const TermianlComponent = () => {
    const fitAddon = new FitAddon();

    const xtermRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const term = new Terminal({
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            fontWeight: 400,
            fontSize: 14,
        });
        if (!xtermRef.current) {
            return () => {
                term.dispose();
            };
        }
        term.open(xtermRef.current);

        //Styling
        // term.setOption("theme", {
        //     background: "black",
        //     foreground: "white"
        // });

        // Load Fit Addon
        term.loadAddon(fitAddon);

        // const pid = await initSysEnv(term),
        const ws = new WebSocket("ws://192.168.110.127:4000"),
            attachAddon = new AttachAddon(ws);
        term.loadAddon(attachAddon);

        // Open the terminal in #terminal-container

        //Write text inside the terminal
        // term.write(c.magenta("I am ") + c.blue("Blue") + c.red(" and i like it"));

        // Make the terminal's size and geometry fit the size of #terminal-container
        fitAddon.fit();

        return () => {
            term.dispose();
        };
    }, [])

    return (
        <div className="App" style={{ background: "" }}>
            <Resizable
                maxWidth={800}
                maxHeight={400}
                style={{
                    background: "firebrick",
                    padding: "0.4em",
                    margin: "1em"
                }}
            >
                <div ref={xtermRef} style={{ height: "100%", width: "100%" }} />

                <ResizeObserver
                    onResize={rect => {
                        fitAddon.fit();
                        console.log("Resized. New bounds:", rect.width, "x", rect.height);
                    }}
                    onPosition={rect => {
                        console.log("Moved. New position:", rect.left, "x", rect.top);
                    }}
                />
            </Resizable>
        </div>
    );
}


export default TermianlComponent;