"use strict";

import * as fs from 'fs';
import { exit } from 'process';
import pkg from 'nodegit';
const { Clone } = pkg;

export default class KiwiLocalRepo {

    constructor(localRepoPath) {
        this._repoPath = localRepoPath;

        if (fs.existsSync(this._repoPath)) {
            console.log("File exists");
            fs.readdirSync(this._repoPath).forEach(e => console.log(e));


        }
        else {
            console.log("file dont exist");
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