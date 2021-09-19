// forms
import getFormById from './clientsFormsGet/formById';
import getFormPathsByName from './clientsFormsGet/pathsByName';
import getFormValuesByName from './clientsFormsGet/valuesByName';
import getFormValuesByPath from './clientsFormsGet/valuesByPath';
// dicts
import getDicts from './dictionaryGet/dicts';
import setCreateDict from './dictionarySet/createDict';
import setDeleteDict from './dictionarySet/deleteDict';
// projectsBlocks
import getProjectPathsByName from './projectsBlocksGet/pathsByName';
import getProjectValuesByName from './projectsBlocksGet/valuesByName';
import getProjectValuesByPath from './projectsBlocksGet/valuesByPath';
import setProjectValueToBlock from './projectsBlocksSet/valueToBlock';
// project
import getProjectProjectBlocksTypes from './projectsGet/projectBlocksTypes';
import getProjectProjectById from './projectsGet/projectById';
import getProjectProjectClasses from './projectsGet/projectClasses';
import getProjectProjectSettings from './projectsGet/projectSettings';
import getProjectProjectTypes from './projectsGet/projectTypes';
import getProjectProjectsByFilters from './projectsGet/projectsByFilters';
import getProjectRelatedProjects from './projectsGet/relatedProjects';

import setProjectCreateProject from './projectsSet/createProject';
import setProjectCreateProjectClass from './projectsSet/createProjectClass';
import setProjectDeleteProject from './projectsSet/deleteProject';
import setProjectDeleteProjectClass from './projectsSet/deleteProjectClass';
import setProjectProjectSettings from './projectsSet/projectSettings';
import setProjectRelatedProject from './projectsSet/relatedProject';
import setProjectUpdateProject from './projectsSet/updateProject';
// scripts
import getScriptTypes from './scriptsGet/scriptTypes';
// settings
import getGeneralSettings from './settingsGet/generalSettings';
import setGeneralSettings from './settingsSet/generalSettings';
// utils
import debug from './utils/debug';
import uuidv4 from './utils/uuidv4';
// api-settins
import { settings, useSettingsStore } from './base/SettingsController';

/**
 * @author Artur Arslanov <a.arslanov@pravo.tech>
 * @module c1-api.js
 * @version 1.1.5
 * @namespace $
 */

export default {
    clientsFormsGet: {
        formById: getFormById,
        formPathsByName: getFormPathsByName,
        formValuesByName: getFormValuesByName,
        formValuesByPath: getFormValuesByPath,
    },
    dictionaryGet: {
        dicts: getDicts,
    },
    dictionarySet: {
        createDict: setCreateDict,
        dleteDict: setDeleteDict,
    },
    projectsBlocksGet: {
        pathsByName: getProjectPathsByName,
        valuesByName: getProjectValuesByName,
        valuesByPath: getProjectValuesByPath,
    },
    projectsBlocksSet: {
        valueToBlock: setProjectValueToBlock,
    },
    projectsGet: {
        projectBlocksTypes: getProjectProjectBlocksTypes,
        projectById: getProjectProjectById,
        projectClasses: getProjectProjectClasses,
        projectSettings: getProjectProjectSettings,
        projectTypes: getProjectProjectTypes,
        projectsByFilters: getProjectProjectsByFilters,
        relatedProjects: getProjectRelatedProjects,
    },
    projectsSet: {
        createProject: setProjectCreateProject,
        createProjectClass: setProjectCreateProjectClass,
        deleteProject: setProjectDeleteProject,
        deleteProjectClass: setProjectDeleteProjectClass,
        projectSettings: setProjectProjectSettings,
        relatedProject: setProjectRelatedProject,
        updateProject: setProjectUpdateProject,
    },
    scriptsGet: {
        scriptTypes: getScriptTypes,
    },
    settingsGet: {
        generalSettings: getGeneralSettings,
    },
    settingsSet: {
        generalSettings: setGeneralSettings,
    },
    utils: {
        debug,
        uuidv4,
    },
    connection: {
        settings,
        useSettingsStore,
    },
};

export {
    // forms
    getFormById,
    getFormPathsByName,
    getFormValuesByName,
    getFormValuesByPath,
    // dicts
    getDicts,
    setCreateDict,
    setDeleteDict,
    // projectsBlocks
    getProjectPathsByName,
    getProjectValuesByName,
    getProjectValuesByPath,
    setProjectValueToBlock,
    // project
    getProjectProjectBlocksTypes,
    getProjectProjectById,
    getProjectProjectClasses,
    getProjectProjectSettings,
    getProjectProjectTypes,
    getProjectProjectsByFilters,
    getProjectRelatedProjects,
    setProjectCreateProject,
    setProjectCreateProjectClass,
    setProjectDeleteProject,
    setProjectDeleteProjectClass,
    setProjectProjectSettings,
    setProjectRelatedProject,
    setProjectUpdateProject,
    // scripts
    getScriptTypes,
    // settings
    getGeneralSettings,
    setGeneralSettings,
    // utils
    debug,
    uuidv4,
    // app-settings
    settings,
    useSettingsStore,
};
