"use strict";

import * as fs from 'fs';
import { exit } from 'process';
import pkg from 'nodegit';
const { Clone } = pkg;
import glob from 'glob';


export default class KiwiLocalRepo {

    constructor(localRepoPath) {
        this._repoPath = localRepoPath;

        if (fs.existsSync(this._repoPath)) {
            console.log("File exists");
            glob(`${localRepoPath}/**`, (err, f) => console.log(f));
            

        }
        else {
            console.log("Unable to find LocalRepoFolder :/");
            exit(1);
        }
    }

    get repoPath() {
        return this._repoPath;
    }

    installPkg(gitUrl) {
        Clone.clone(gitUrl, this._repoPath);
    }
}