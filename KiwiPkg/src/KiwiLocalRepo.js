"use strict";

import * as fs from 'fs';
import { exit } from 'process';
import pkg from 'nodegit';
const { Clone } = pkg;
import glob from 'glob';
import termkit from 'terminal-kit';


export default class KiwiLocalRepo {

    constructor(localRepoPath) {
        this._repoPath = localRepoPath;

        if (fs.existsSync(this._repoPath)) {
            console.log("File exists");
            

        }
        else {
            console.log("Unable to find LocalRepoFolder :/");
            exit(1);
        }
    }

    get repoPath() {
        return this._repoPath;
    }

    async installPkg(gitUrl) {
        let repoUrl = gitUrl.split("/");
        let repoName = repoUrl[repoUrl.length - 1].replaceAll(".git", "");

        termkit.terminal.bold.cyan(">>> ").white(`Checking if ${repoName} is not installed ...\n`);
        if (!fs.existsSync(`${this._repoPath}/${repoName}`)) {
            termkit.terminal.bold.cyan(">>> ").white(`Installing ${repoName} ...\n`);
            await Clone.clone(gitUrl, `${this._repoPath}/${repoName}`);

            glob(`${this._repoPath}/${repoName}/**`, (err, f) => f.forEach(cur => {
                console.log(cur);
                if (cur.includes("kiwimod.json")) console.log(`Found a KiwiMod for ${repoName} !`);
            }));
        } else termkit.terminal.bold.red(">>> ").white("Package already installed 😅\n");

    }
}