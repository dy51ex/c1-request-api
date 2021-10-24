// forms
import getFormById from './clientsFormsGet/formById';
import getFormPathsByName from './clientsFormsGet/pathsByName';
import getFormValuesByName from './clientsFormsGet/valuesByName';
import getFormValuesByPath from './clientsFormsGet/valuesByPath';
// dicts
import getDicts from './dictionaryGet/dicts';
import getDictValues from './dictionaryGet/dictValues';
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
// public
import objectsGet, { Case } from './objects/get';
import objectsPatch from './objects/patch';

/**
 * @author Artur Arslanov <a.arslanov@pravo.tech>
 * @module c1-api.js
 * @version 1.1.5
 * @namespace $
 */

export {
    // helpers
    Case,
    // object, v2
    objectsGet,
    objectsPatch,
    // forms
    getFormById,
    getFormPathsByName,
    getFormValuesByName,
    getFormValuesByPath,
    // dicts
    getDicts,
    setCreateDict,
    setDeleteDict,
    getDictValues,
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
