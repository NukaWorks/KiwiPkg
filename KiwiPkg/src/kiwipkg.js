"use strict";

import KiwiLocalRepo from "./KiwiLocalRepo.js"

let truc = new KiwiLocalRepo("E:\\TempWork\\KiwiPkg");
console.log(truc.repoPath)
// truc.installPkg("https://github.com/NutDevs-org/ModularKit.git");
export { KiwiLocalRepo };