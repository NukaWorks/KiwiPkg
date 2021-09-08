"use strict";

import KiwiLocalRepo from "./KiwiLocalRepo.js"

let kiwi = new KiwiLocalRepo("E:\\TempWork\\KiwiPkg");
kiwi.installPkg("https://github.com/NutDevs-org/KiwiPkg.git");

export { KiwiLocalRepo };