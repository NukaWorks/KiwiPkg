"use strict";

import * as fs from 'fs';
import { exit } from 'process';
import pkg from 'nodegit';
const { Clone } = pkg;
import glob from 'glob';
import termkit from 'terminal-kit';
import path from 'path';

export default class KiwiLocalRepo {

    constructor(localRepoPath) {
        this._repoPath = localRepoPath;

        if (fs.existsSync(this._repoPath)) {
            termkit.terminal.bold.green(">>> ").white(`Found local repository at ${this._repoPath}\n`);
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
        let kiwiModManifest = "kiwimod.json";
        let repoUrl = gitUrl.split("/");
        let repoName = repoUrl[repoUrl.length - 1].replaceAll(".git", "");

        termkit.terminal.bold.yellow(">>> ").white(`Checking if ${repoName} is not installed ...\n`);
        if (!fs.existsSync(`${this._repoPath}/${repoName}`)) {
            termkit.terminal.bold.cyan(">>> ").white(`Installing ${repoName} ...\n`);
            await Clone.clone(gitUrl, `${this._repoPath}/${repoName}`); // Clone the repo which contains modules.
            termkit.terminal.bold.yellow(">>> ").white(`Getting more info of the repo ${repoName} ...\n`);

            glob(`${this._repoPath}/${repoName}/**`, (err, f) => f.forEach(cur => {
                if (cur.includes(kiwiModManifest)) { // Module manifest file.
                    termkit.terminal.bold.green(">>> ").white(`Found a KiwiMod inside ${repoName}, getting the module ...\n`);
                    if (fs.existsSync(cur.replaceAll(kiwiModManifest, ""))) {
                        termkit.terminal.bold.green(">>> ").white("Found package.json 😋");

                        // let modPackageJson = fs.readFile()
                    } else {
                        termkit.terminal.bold.red(">>> ").bold.red("Unable to find package.json, Aborting... 😅\n");
                        return 1;
                    }

            }
            }));
        } else termkit.terminal.bold.red(">>> ").bold.white("Package already installed 😅\n");

    }
}