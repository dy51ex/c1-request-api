"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSettingsStore = exports.settings = exports.uuidv4 = exports.debug = exports.setGeneralSettings = exports.getGeneralSettings = exports.getScriptTypes = exports.setProjectUpdateProject = exports.setProjectRelatedProject = exports.setProjectProjectSettings = exports.setProjectDeleteProjectClass = exports.setProjectDeleteProject = exports.setProjectCreateProjectClass = exports.setProjectCreateProject = exports.getProjectRelatedProjects = exports.getProjectProjectsByFilters = exports.getProjectProjectTypes = exports.getProjectProjectSettings = exports.getProjectProjectClasses = exports.getProjectProjectById = exports.getProjectProjectBlocksTypes = exports.setProjectValueToBlock = exports.getProjectValuesByPath = exports.getProjectValuesByName = exports.getProjectPathsByName = exports.setDeleteDict = exports.setCreateDict = exports.getDicts = exports.getFormValuesByPath = exports.getFormValuesByName = exports.getFormPathsByName = exports.getFormById = void 0;
// forms
const formById_1 = __importDefault(require("./clientsFormsGet/formById"));
exports.getFormById = formById_1.default;
const pathsByName_1 = __importDefault(require("./clientsFormsGet/pathsByName"));
exports.getFormPathsByName = pathsByName_1.default;
const valuesByName_1 = __importDefault(require("./clientsFormsGet/valuesByName"));
exports.getFormValuesByName = valuesByName_1.default;
const valuesByPath_1 = __importDefault(require("./clientsFormsGet/valuesByPath"));
exports.getFormValuesByPath = valuesByPath_1.default;
// dicts
const dicts_1 = __importDefault(require("./dictionaryGet/dicts"));
exports.getDicts = dicts_1.default;
const createDict_1 = __importDefault(require("./dictionarySet/createDict"));
exports.setCreateDict = createDict_1.default;
const deleteDict_1 = __importDefault(require("./dictionarySet/deleteDict"));
exports.setDeleteDict = deleteDict_1.default;
// projectsBlocks
const pathsByName_2 = __importDefault(require("./projectsBlocksGet/pathsByName"));
exports.getProjectPathsByName = pathsByName_2.default;
const valuesByName_2 = __importDefault(require("./projectsBlocksGet/valuesByName"));
exports.getProjectValuesByName = valuesByName_2.default;
const valuesByPath_2 = __importDefault(require("./projectsBlocksGet/valuesByPath"));
exports.getProjectValuesByPath = valuesByPath_2.default;
const valueToBlock_1 = __importDefault(require("./projectsBlocksSet/valueToBlock"));
exports.setProjectValueToBlock = valueToBlock_1.default;
// project
const projectBlocksTypes_1 = __importDefault(require("./projectsGet/projectBlocksTypes"));
exports.getProjectProjectBlocksTypes = projectBlocksTypes_1.default;
const projectById_1 = __importDefault(require("./projectsGet/projectById"));
exports.getProjectProjectById = projectById_1.default;
const projectClasses_1 = __importDefault(require("./projectsGet/projectClasses"));
exports.getProjectProjectClasses = projectClasses_1.default;
const projectSettings_1 = __importDefault(require("./projectsGet/projectSettings"));
exports.getProjectProjectSettings = projectSettings_1.default;
const projectTypes_1 = __importDefault(require("./projectsGet/projectTypes"));
exports.getProjectProjectTypes = projectTypes_1.default;
const projectsByFilters_1 = __importDefault(require("./projectsGet/projectsByFilters"));
exports.getProjectProjectsByFilters = projectsByFilters_1.default;
const relatedProjects_1 = __importDefault(require("./projectsGet/relatedProjects"));
exports.getProjectRelatedProjects = relatedProjects_1.default;
const createProject_1 = __importDefault(require("./projectsSet/createProject"));
exports.setProjectCreateProject = createProject_1.default;
const createProjectClass_1 = __importDefault(require("./projectsSet/createProjectClass"));
exports.setProjectCreateProjectClass = createProjectClass_1.default;
const deleteProject_1 = __importDefault(require("./projectsSet/deleteProject"));
exports.setProjectDeleteProject = deleteProject_1.default;
const deleteProjectClass_1 = __importDefault(require("./projectsSet/deleteProjectClass"));
exports.setProjectDeleteProjectClass = deleteProjectClass_1.default;
const projectSettings_2 = __importDefault(require("./projectsSet/projectSettings"));
exports.setProjectProjectSettings = projectSettings_2.default;
const relatedProject_1 = __importDefault(require("./projectsSet/relatedProject"));
exports.setProjectRelatedProject = relatedProject_1.default;
const updateProject_1 = __importDefault(require("./projectsSet/updateProject"));
exports.setProjectUpdateProject = updateProject_1.default;
// scripts
const scriptTypes_1 = __importDefault(require("./scriptsGet/scriptTypes"));
exports.getScriptTypes = scriptTypes_1.default;
// settings
const generalSettings_1 = __importDefault(require("./settingsGet/generalSettings"));
exports.getGeneralSettings = generalSettings_1.default;
const generalSettings_2 = __importDefault(require("./settingsSet/generalSettings"));
exports.setGeneralSettings = generalSettings_2.default;
// utils
const debug_1 = __importDefault(require("./utils/debug"));
exports.debug = debug_1.default;
const uuidv4_1 = __importDefault(require("./utils/uuidv4"));
exports.uuidv4 = uuidv4_1.default;
// api-settins
const SettingsController_1 = require("./base/SettingsController");
Object.defineProperty(exports, "settings", { enumerable: true, get: function () { return SettingsController_1.settings; } });
Object.defineProperty(exports, "useSettingsStore", { enumerable: true, get: function () { return SettingsController_1.useSettingsStore; } });
/**
 * @author Artur Arslanov <a.arslanov@pravo.tech>
 * @module c1-api.js
 * @version 1.1.5
 * @namespace $
 */
exports.default = {
    clientsFormsGet: {
        formById: formById_1.default,
        formPathsByName: pathsByName_1.default,
        formValuesByName: valuesByName_1.default,
        formValuesByPath: valuesByPath_1.default,
    },
    dictionaryGet: {
        dicts: dicts_1.default,
    },
    dictionarySet: {
        createDict: createDict_1.default,
        dleteDict: deleteDict_1.default,
    },
    projectsBlocksGet: {
        pathsByName: pathsByName_2.default,
        valuesByName: valuesByName_2.default,
        valuesByPath: valuesByPath_2.default,
    },
    projectsBlocksSet: {
        valueToBlock: valueToBlock_1.default,
    },
    projectsGet: {
        projectBlocksTypes: projectBlocksTypes_1.default,
        projectById: projectById_1.default,
        projectClasses: projectClasses_1.default,
        projectSettings: projectSettings_1.default,
        projectTypes: projectTypes_1.default,
        projectsByFilters: projectsByFilters_1.default,
        relatedProjects: relatedProjects_1.default,
    },
    projectsSet: {
        createProject: createProject_1.default,
        createProjectClass: createProjectClass_1.default,
        deleteProject: deleteProject_1.default,
        deleteProjectClass: deleteProjectClass_1.default,
        projectSettings: projectSettings_2.default,
        relatedProject: relatedProject_1.default,
        updateProject: updateProject_1.default,
    },
    scriptsGet: {
        scriptTypes: scriptTypes_1.default,
    },
    settingsGet: {
        generalSettings: generalSettings_1.default,
    },
    settingsSet: {
        generalSettings: generalSettings_2.default,
    },
    utils: {
        debug: debug_1.default,
        uuidv4: uuidv4_1.default,
    },
    connection: {
        settings: SettingsController_1.settings,
        useSettingsStore: SettingsController_1.useSettingsStore,
    },
};
//# sourceMappingURL=index.js.map