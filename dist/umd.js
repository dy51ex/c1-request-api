(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.$ = {}));
})(this, (function (exports) { 'use strict';

    // const fetch = fetch || 1;
    const axiosMock = typeof fetch === 'function' ? fetch : null;
    class SettingsController {
        login;
        password;
        httpAgent;
        platform;
        token;
        tokenExpiresIn;
        constructor(login, password, httpAgent, platform, token, tokenExpiresIn) {
            this.login = login;
            this.password = password;
            this.httpAgent = httpAgent;
            this.platform = platform;
            this.token = token;
            this.tokenExpiresIn = tokenExpiresIn;
        }
        async getToken() {
            if (this.platform === 'case') {
                return 'none';
            }
            const timestamp = Date.now();
            if (!this.token || !this.tokenExpiresIn || timestamp > this.tokenExpiresIn) {
                const tokenn = await this.requestAndStoreToken();
                if (!tokenn) {
                    throw new Error('connection: cant refresh auth token');
                }
                return tokenn;
            }
            return this.token;
        }
        async requestAndStoreToken() {
            try {
                const timestamp = Date.now();
                const response = (await this.httpAgent.post('/api/ThirdPartyAuth/Login', {
                    Login: this.login,
                    Password: this.password,
                    RememberMe: true,
                    ProviderName: 'IDE',
                })).data;
                this.token = response.Token.access_token;
                const expiresIn = timestamp + parseInt(`${response.Token.expires_in}000`, 10);
                this.tokenExpiresIn = expiresIn;
                console.log('New token catched');
                return this.token;
            }
            catch (error) {
                throw new Error('Token not received, possible bad auth');
            }
        }
    }
    const settings = {};
    const useSettingsStore = (params) => {
        settings.version = params.version;
        settings.debug = params.debug || false;
        let httpAgent;
        if (params.platform !== 'case') {
            httpAgent = require('axios');
            httpAgent.defaults.baseURL = params.domain;
        }
        else {
            httpAgent = axiosMock;
        }
        settings.httpAgent = httpAgent;
        settings.controller = new SettingsController(params.login, params.password, httpAgent, params.platform || 'node', params.token, params.tokenExpiresIn);
        return settings;
    };

    var c1request = async (options) => {
        const url = options.url.includes('?')
            ? `${options.url}&api-version=${settings.version || ''}`
            : `${options.url}?api-version=${settings.version || ''}`;
        let requestData = {
            url: `${settings.version ? url : options.url}`,
            method: options.type,
            headers: {
                'Content-Type': 'application/json',
            },
            body: options.body,
            data: options.body,
            params: options.params,
        };
        if (settings.controller.platform !== 'case') {
            // @ts-ignore
            requestData.headers.Authorization = `Bearer ${await settings.controller.getToken()}`;
        }
        else {
            // @ts-ignore
            requestData.body = JSON.stringify(requestData.body);
        }
        const request = await settings.httpAgent(requestData);
        const response = request.data || JSON.parse(request.body);
        return (response.Result || response);
    };

    var debug = (level, method, state, data) => {
        if (!settings.debug) {
            return;
        }
        const dataString = typeof data === 'string' ? data : data?.Error;
        if (level !== 'Error') {
            return;
        }
        console.log(`${level}: [${method}]{${state}} - ${dataString || ''}`);
    };

    var LogAction = async (name, logic) => {
        debug('Info', name, 'started', '');
        let result;
        try {
            result = await logic();
        }
        catch (err) {
            let error;
            try {
                error = JSON.stringify(err);
            }
            catch {
                error = err;
            }
            debug('Error', name, 'progress', error);
            throw err;
        }
        debug('Info', name, 'ended', JSON.stringify(result));
        return result;
    };

    /**
     * Возвращает структуру клиентского запроса по указанному Id формы
     * @example $.clientForms.formById(id)
     */
    var formById = async (formId) => {
        const logic = () => c1request({
            type: 'get',
            url: `/api/IntakeObjects/Get/?Id=${formId}`,
        });
        return LogAction('$.clientForms.formById', logic);
    };

    var pathsByName$2 = async (obj, params) => {
        const logic = () => {
            const keys = ['MetadataOfBlocks', 'MetadataBlocks'];
            const key = keys.find((entry) => obj[entry]);
            if (!key)
                throw new Error('obj - no MetadataOfBlocks found in project');
            const result = [];
            // eslint-disable-next-line
            obj[key].forEach((block) => block.Lines?.forEach(
            // eslint-disable-next-line
            (line) => line.Fields?.forEach((field) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const name = typeof field.ProjectField === 'object' ? field.ProjectField.Name : '';
                if (!field.ProjectField
                    || !name
                    || !line.LineType
                    || !block.Id
                    || !line.Id
                    || !field.Id) {
                    throw new Error('obj - no ProjectField in field found or LineType undefined');
                }
                if (params.fieldNames.includes(name || 'undefined')
                    && (params.blockName ? block.NameInProject === params.blockName : true)) {
                    result[params.fieldNames.indexOf(name)] = {
                        blockId: block.Id,
                        lineId: line.Id,
                        fieldId: field.Id,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        blockName: block.NameInProject,
                        multiBlock: block.IsRepeatable,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        multiLine: line.LineType.SysName === 'Repeated',
                        name: name,
                    };
                }
            })));
            return result;
        };
        return LogAction('$.pathsByName', logic);
    };

    /**
     * Осуществляет поиск поля по его названию в MetadataOfBlocks,
     * если поле не найдено - вызывет ошибку. Для получения значения поля
     * лучше использовать $.clientForms.valuesByName
     * @method $.clientForms.pathsByName
     * @example $.clientForms.pathsByName(form, { fieldNames:
     * ['Поле 1', 'Поле 2'], blockName: 'Новый блок' })
     */
    var pathsByName$1 = async (form, params) => {
        const logic = () => pathsByName$2(form, params);
        return LogAction('$.clientForms.pathsByName', logic);
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    var valuesByPathFn = (obj, params) => {
        const logic = () => {
            if (!params.fieldPath)
                throw new Error('no fieldPath present');
            if (!obj.Blocks)
                throw new Error('no Blocks found');
            const result = [];
            const lines = obj.Blocks.filter((block) => {
                if (!block.VisualBlockId) {
                    throw new Error('No VisualBlockId found in Blocks');
                }
                return params.fieldPath.map((el) => el.blockId).includes(block.VisualBlockId);
            })
                .map((block) => Object.assign(block, {
                Lines: (block.Lines ?? []).map((line) => Object.assign(line, {
                    blockId: block.VisualBlockId,
                    blockRealId: block.Id,
                    blockName: block.Name,
                    blockOrder: block.Order,
                })),
            }))
                .flatMap((block) => block.Lines)
                .filter((line) => params.fieldPath.map((el) => el.lineId).includes(line.BlockLineId ?? ''));
            lines.forEach((line) => {
                line.Values?.forEach((field) => {
                    const fieldData = params.fieldPath
                        .map((el) => el.fieldId).includes(field.VisualBlockProjectFieldId);
                    if (fieldData) {
                        const curField = params.fieldPath
                            .find((el) => el.fieldId === field.VisualBlockProjectFieldId);
                        if (!line.blockId
                            || !line.BlockLineId
                            || !line.blockRealId
                            || !curField?.fieldId) {
                            throw new Error('No all needed info from FieldPath');
                        }
                        result.push({
                            Value: field.Value,
                            Name: curField.name,
                            blockId: line.blockId,
                            blockRealId: line.blockRealId,
                            blockName: line.blockName || undefined,
                            blockOrder: line.blockOrder,
                            lineId: line.BlockLineId,
                            lineRealId: line.Id || undefined,
                            lineOrder: line.Order,
                            fieldId: curField?.fieldId,
                            multiBlock: curField?.multiBlock,
                            multiLine: curField?.multiLine,
                        });
                    }
                });
            });
            if (!params.grouping) {
                if (params.returnFields) {
                    return result;
                }
                if (params.deepValues) {
                    const dresult = result.map((field) => (field?.Value !== undefined && typeof field?.Value === 'object'
                        ? field.Value.Name
                        : field?.Value));
                    return dresult;
                }
                const dresult = result.map((field) => field?.Value);
                return dresult;
            }
            if (params.grouping === 'blocks') {
                const groupedResult = {};
                result
                    .filter((el) => el)
                    .forEach((field) => {
                    if (!field.blockRealId)
                        throw new Error('$.projectsGet.valuesByPath - no blockRealId found in field');
                    if (!groupedResult[field.blockRealId])
                        groupedResult[field.blockRealId] = [];
                    groupedResult[field.blockRealId].push(field);
                });
                if (params.returnFields) {
                    const fresult = Object.values(groupedResult);
                    return fresult;
                }
                if (params.deepValues) {
                    const fresult = Object.values(groupedResult).map((block) => block.map((field) => (field?.Value !== undefined && typeof field?.Value === 'object'
                        ? field.Value.Name
                        : field?.Value)));
                    return fresult;
                }
                const fresult = Object.values(groupedResult)
                    .map((block) => block.map((field) => field.Value));
                return fresult;
            }
            if (params.grouping === 'lines') {
                const groupedResult = {};
                result
                    .filter((el) => el)
                    .forEach((field) => {
                    if (!field.lineRealId) {
                        throw new Error('$.projectsGet.valuesByPath - no blockRealId found in field');
                    }
                    if (!groupedResult[field.lineRealId])
                        groupedResult[field.lineRealId] = [];
                    groupedResult[field.lineRealId].push(field);
                });
                if (params.returnFields) {
                    const fresult = Object.values(groupedResult);
                    return fresult;
                }
                if (params.deepValues) {
                    const fresult = Object.values(groupedResult)
                        .map((line) => line.map((field) => (field?.Value !== undefined && typeof field?.Value === 'object'
                        ? field.Value.Name : field?.Value)));
                    return fresult;
                }
                const fresult = Object.values(groupedResult)
                    .map((line) => line.map((field) => field.Value));
                return fresult;
            }
            if (params.grouping === 'blocksLines') {
                const groupedResult = {};
                result
                    .filter((el) => el)
                    .forEach((field) => {
                    if (!field.blockRealId)
                        throw new Error('$.projectsGet.valuesByPath - no blockRealId found in field');
                    if (!groupedResult[field.blockRealId])
                        groupedResult[field.blockRealId] = [];
                    groupedResult[field.blockRealId].push(field);
                });
                const grouped = Object.values(groupedResult);
                const blockLines = grouped.map((block) => {
                    const lineGroup = {};
                    block
                        .filter((el) => el)
                        .forEach((field) => {
                        if (!field.lineRealId)
                            throw new Error('$.projectsGet.valuesByPath - no blockRealId found in field');
                        if (!lineGroup[field.lineRealId])
                            lineGroup[field.lineRealId] = [];
                        lineGroup[field.lineRealId].push(field);
                    });
                    return Object.values(lineGroup);
                });
                if (params.returnFields) {
                    return blockLines;
                }
                if (params.deepValues) {
                    const fresult = blockLines
                        .map((block) => block
                        .map((line) => line
                        .map((field) => (field?.Value !== undefined && typeof field?.Value === 'object'
                        ? field.Value.Name : field?.Value))));
                    return fresult;
                }
                const fresult = blockLines
                    .map((block) => block.map((line) => line.map((field) => field.Value)));
                return fresult;
            }
            return [];
        };
        return LogAction('$.valuesByPath', logic);
    };

    /**
     * Совершает поиск значений поля по его имени,
     * возвращает массив результатов в зависимости от параметров, например ['Значение1', 'Значение2']
     * @example $.clientForms.valuesByName(form, { fieldNames: ['Поле 1', 'Поле 2'] ,
     * blockName: 'Новый блок', deepValues: true })
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async function valuesByName$1(form, params) {
        const logic = async () => {
            const paths = await pathsByName$2(form, params);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const values = await valuesByPathFn(form, Object.assign(params, { fieldPath: paths }));
            return values;
        };
        return LogAction('$.clientForms.valuesByName', logic);
    }

    /**
     * Ищет значения по указанному пути (путь можно получить
     * с помошью pathsByName), возвращает массив данных, в зависимости от параметров
     * @example $.clientFormsGet.valuesByPath(form, { fieldPath:
     * { blockId: '3271c745-9d01-eb11-b826-0050560107dd', lineId:'3271c745-9d01-eb11-b826-0050560107dd',
     * fieldId:'3271c745-9d01-eb11-b826-0050560107dd' }, grouping: 'blocks',
     * returnFields: true, deepValues: true })
     */
    async function valuesByPath$1(form, params) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const logic = () => valuesByPathFn(form, params);
        return LogAction('$.clientFormsGet.valuesByPath', logic);
    }

    async function dicts(dictName) {
        const logic = async () => {
            const response = await c1request({
                url: '/api/Dictionary/GetDictionaryList',
                type: 'post',
                body: dictName ? { Name: dictName, PageSize: 999 } : { PageSize: 999 },
            });
            if (!dictName)
                return response;
            const responseItems = await c1request({
                url: '/api/Dictionary/GetDictionaryItems',
                type: 'post',
                body: {
                    // @ts-ignore
                    SystemName: response.Result[0].SystemName,
                    WithSubItems: true,
                    PageSize: 999,
                },
            });
            const result = {
                // @ts-ignore
                Id: response.Result[0].Id,
                // @ts-ignore
                SystemName: response.Result[0].SystemName,
                // @ts-ignore
                Items: responseItems.Result,
            };
            return result;
        };
        return LogAction('$.dictionaryGet.dicts', logic);
    }

    async function dictValues(dictId) {
        const logic = async () => {
            const response = await c1request({
                url: `/api/v2/dictionaries/${dictId}/values`,
                type: 'get',
            });
            return response;
        };
        return LogAction('$.dictionaryGet.dicts', logic);
    }

    /**
     * Создает новый справочник
     * @example $.dictionarySet.createDict(dictStructure)
     */
    var createDict = async (params) => {
        const logic = () => c1request({
            url: '/api/Dictionary/CreateDictionary',
            type: 'post',
            body: params,
        });
        return LogAction('$.dictionarySet.createDict', logic);
    };

    /**
     * Удаляет справочник с указанным Id
     * @example $.dictionarySet.deleteDict(dictId)
     */
    var deleteDict = async (dictId) => {
        const logic = () => c1request({
            url: `/api/Dictionary/DeleteDictionary?dictionaryId=${dictId}`,
            type: 'delete',
        });
        return LogAction('$.dictionarySet.deleteDict', logic);
    };

    /**
     * Получает путь до значения поля по имени поля, возвращая массив путей
     * @example $.projectsBlocksGet.pathsByName(
     *  project, { fieldNames: ['Поле 1', 'Поле 2'], blockName: 'Новый блок' }
     * )
     */
    var pathsByName = async (project, params) => {
        const logic = () => pathsByName$2(project, params);
        return LogAction('$.projectsBlocksGet.pathsByName', logic);
    };

    /**
     * Ищет значения по указанному пути (путь можно получить
     * с помошью pathsByName), возвращает массив данных, в зависимости от параметров
     * @example $.projectsBlocksGet.valuesByPath(
     * form, { fieldPath: { blockId: '3271c745-9d01-eb11-b826-0050560107dd',
     * lineId:'3271c745-9d01-eb11-b826-0050560107dd',
     * fieldId:'3271c745-9d01-eb11-b826-0050560107dd' }, grouping: 'blocks',
     * returnFields: true, deepValues: true })
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async function valuesByPath(project, params) {
        const logic = () => valuesByPathFn(project, params);
        return LogAction('$.projectsBlocksGet.valuesByPath', logic);
    }

    /**
     * Совершает поиск значений поля по его имени, возвращает массив результатов в
     * зависимости от параметров, например ['Значение1', 'Значение2']
     * @example $.projectsBlocksGet.valuesByName(form,
     * { fieldNames: ['Поле 1', 'Поле 2'] , blockName: 'Новый блок', deepValues: true })
     */
    async function valuesByName(project, params) {
        const logic = async () => {
            const paths = await pathsByName(project, params);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const values = await valuesByPath(project, Object.assign(params, { fieldPath: paths }));
            return values;
        };
        return LogAction('$.projectsBlocksGet.valuesByName', logic);
    }

    /**
     * Записывает в передаваемый обьект данные по указанному пути, для записи изменений нужно вызвать $.projectsSet.updateProject()
     * @example $.projectsBlocksSet.valueToBlock(project, $.projectsBlocksGet.pathsByName(project, { fieldNames: ['Поле 1'], blockName: 'Новый блок' })[0], 'Значение 2')
     */
    function valueToBlock (project, fieldPath, valueToSave) {
        const logic = () => {
            if (!project.Blocks)
                throw '$.projectsSet.valueToBlock - no Block found in project';
            const blockIsExist = project.Blocks.find((block) => block.VisualBlockId === fieldPath.blockId &&
                (fieldPath.blockOrder ? fieldPath.blockOrder === block.Order : true));
            const blockIndex = blockIsExist
                ? project.Blocks.map((block) => block.VisualBlockId + (fieldPath.blockOrder ? block.Order : '')).indexOf(fieldPath.blockId + (fieldPath.blockOrder ? fieldPath.blockOrder : ''))
                : project.Blocks.push({ VisualBlockId: fieldPath.blockId, Order: fieldPath.blockOrder || 0, Lines: [] }) - 1;
            const lineIsExist = project.Blocks[blockIndex].Lines.find((line) => line.BlockLineId === fieldPath.lineId &&
                (fieldPath.lineOrder === 0 || fieldPath.lineOrder ? fieldPath.lineOrder === line.Order : true));
            const lineIndex = lineIsExist
                ? project.Blocks[blockIndex]
                    .Lines.map((line) => line.BlockLineId + (fieldPath.lineOrder ? line.Order : ''))
                    .indexOf(fieldPath.lineId + (fieldPath.lineOrder ? fieldPath.lineOrder : ''))
                : project.Blocks[blockIndex].Lines.push({
                    BlockLineId: fieldPath.lineId,
                    Order: fieldPath.lineOrder || 0,
                    Values: [],
                }) - 1;
            const fieldIsExist = project.Blocks[blockIndex].Lines[lineIndex].Values.find((value) => value.VisualBlockProjectFieldId === fieldPath.fieldId);
            const fieldIndex = fieldIsExist
                ? project.Blocks[blockIndex]
                    .Lines[lineIndex].Values.map((value) => value.VisualBlockProjectFieldId)
                    .indexOf(fieldPath.fieldId)
                : project.Blocks[blockIndex].Lines[lineIndex].Values.push({
                    VisualBlockProjectFieldId: fieldPath.fieldId,
                }) - 1;
            project.Blocks[blockIndex].Lines[lineIndex].Values[fieldIndex].Value = valueToSave; //eslint-disable-line
            return project;
        };
        return LogAction('$.projectsBlocksSet.valueToBlock', logic);
    }

    /**
     * Получает все блоки созданные в конструкторе обьектов
     * @example $.projectsGet.projectBlocksTypes(projectId)
     */
    async function projectBlocksTypes () {
        const logic = () => {
            return c1request({
                type: 'post',
                url: '/api/VisualBlocks/GetCustomVisualBlocks',
                body: { PageSize: 999 },
            });
        };
        return LogAction('$.projectsGet.projectBlocksTypes', logic);
    }

    async function projectById(projectId, tabs = 'noTabs') {
        const logic = async () => {
            const project = await c1request({
                type: 'get',
                url: `/api/projects/GetProject?projectId=${projectId}`,
            });
            if (tabs === 'noTabs')
                return project;
            if (tabs === 'mainTab') {
                const mainTab = await c1request({
                    type: 'get',
                    url: `/api/ProjectCustomValues/GetProjectSummary/?request.id=${projectId}`,
                });
                return Object.assign(project, mainTab);
            }
            if (tabs === 'allTabs') {
                const allTabs = c1request({
                    type: 'get',
                    url: `/api/ProjectCustomValues/GetAllVisualBlocks?request.projectId=${projectId}`,
                });
                return Object.assign(project, allTabs);
            }
            const tab = project.ProjectType.Tabs.find((tabData) => tabData.Name === tabs);
            const response = c1request({
                type: 'get',
                url: `/api/ProjectCustomValues/GetProjectTab/?request.id=${project.Id}&request.projectTypeTabId=${tab.Id}`,
            });
            return Object.assign(project, response);
        };
        return LogAction('$.projectsGet.projectById', logic);
    }

    async function projectClasses(className) {
        const logic = async () => {
            const response = await c1request({
                type: 'get',
                url: '/api/ObjectClasses/GetObjectClasses',
            });
            if (className)
                return response.find((classObject) => className === classObject.Name);
            return response;
        };
        return LogAction('$.projectsGet.projectClasses', logic);
    }

    /**
     * Возвращает настройки , такие как биллинг, бюджет, клиенты
     * @example $.projectsGet.projectSettings(projectId)
     */
    async function projectSettings$1 (projectId) {
        const logic = () => {
            return c1request({
                type: 'get',
                url: `/api/ProjectSettings/GetSettings?projectId=${projectId}`,
            });
        };
        return LogAction('$.projectsGet.projectSettings', logic);
    }

    async function projectTypes(projectTypeName) {
        const logic = async () => {
            const response = await c1request({
                type: 'post',
                url: '/api/ProjectTypes/GetProjectTypes',
                body: { PageSize: 999 },
            });
            if (projectTypeName) {
                const projectType = response.find((type) => type.Name === projectTypeName);
                if (!projectType)
                    throw `$.projectsGet.projectTypes - no type named - ${projectTypeName}`;
                const responseDetailed = await c1request({
                    type: 'get',
                    url: `/api/ProjectTypes/GetProjectType/GetProjectType?projectTypeId=${projectType.Id}`,
                });
                return responseDetailed;
            }
            return Promise.all(response.map((type) => c1request({
                type: 'get',
                url: `/api/ProjectTypes/GetProjectType/GetProjectType?projectTypeId=${type.Id}`,
            })));
        };
        return LogAction('$.projectsGet.projectSettings', logic);
    }

    /**
     * Фильтрует дела по указанным параметрам, возвращая массив отфильтрованных дел
     * @example $.projectsGet.projectsByFilters({'Направление': 'Продажи'}, 'Дело', 1, 20, 'Папка с делами')
     */
    async function projectsByFilters (filterFields, projectClass, page, pageSize, folderName) {
        const logic = async () => {
            const filterNames = Object.keys(filterFields);
            const defaultFilters = await c1request({
                type: 'get',
                url: '/api/ProjectFilter/GetDefaultFilters',
            });
            const filters = await Promise.all(filterNames.map(async (filterName) => {
                const customFilters = await c1request({
                    type: 'post',
                    url: '/api/ProjectFilter/GetFilters',
                    body: { Name: filterName, PageSize: 1000 },
                });
                const allfilters = defaultFilters.concat(customFilters);
                const filter = allfilters.find((filterEntry) => filterEntry.Name === filterName);
                if (!filter)
                    throw `$.projectsGet.projectsByFilters - no filter with name ${filterName} found`;
                const responseFilterItems = await c1request({
                    type: 'post',
                    url: '/api/ProjectFilter/GetFilterSuggest',
                    body: { FilterId: filter.Id, Name: filterFields[filterName], PageSize: 1000 },
                });
                return Object.assign(filter, { Items: responseFilterItems });
            }));
            const prepareFilters = filters
                .filter((filter) => filter.Type !== 'Date')
                .map((filter) => ({
                DataField: { Id: filter.Id },
                SearchValues: filter.Items.filter((item) => filterFields[filter.Name ?? ''].includes(item.Name ?? '')).map((item) => item.Id),
            }));
            const prepareFiltersDate = filters
                .filter((f) => f.Type === 'Date')
                .map((filter) => ({
                DataField: { Id: filter.Id },
                SearchValues: [false],
                BeginValue: filterFields[filter.Name ?? ''],
                EndValue: filterFields[filter.Name ?? ''],
            }));
            const prepareClasses = await projectClasses(projectClass);
            if (!prepareClasses)
                throw `$.projectsGet.projectsByFilters - no classes found`;
            const filter = { Filters: [...prepareFilters, ...prepareFiltersDate], ObjectClassId: prepareClasses.Id };
            const groupedProjects = await c1request({
                type: 'post',
                url: '/api/Projects/GetGroupedProjects',
                body: Object.assign(filter, { Page: page || 1, PageSize: pageSize || 20 }),
            });
            if (!folderName) {
                const res = groupedProjects.map((entry) => entry.Projects).flat();
                return res || [];
            }
            const projects = groupedProjects.find((elem) => elem?.ProjectGroupResponse?.Name === (folderName === 'Все дела' ? 'Дела' : folderName));
            projects?.Projects;
            return projects?.Projects || [];
        };
        // @ts-ignore
        return LogAction('$.projectsGet.projectClasses', logic);
    }

    /**
     * Отдает связанные дела, связанными считаются дела проставленные в блок ссылки или добавленные как обьект в конструкторе
     * @example $.projectsGet.relatedProjects(projectId)
     */
    async function relatedProjects (projectId) {
        const logic = () => {
            return c1request({
                type: 'get',
                url: `/api/RelatedObjects/GetRelatedObjects?criterion.type=ProjectToProjects&criterion.id=${projectId}`,
            });
        };
        return LogAction('$.projectsGet.relatedProjects', logic);
    }

    /**
     * Создает новое дело с основными данными - ответственный, название и тд, для записи в блоки, после создания нужно их получить, используя $.projectsGet.projectById(project, 'allTabs')
     * @example $.projectsSet.projectStructure(projectStructure)
     */
    async function createProject (params) {
        const logic = () => {
            return c1request({
                type: 'post',
                url: '/api/Projects/CreateProject',
                body: params,
            });
        };
        return LogAction('$.projectsSet.projectCreate', logic);
    }

    /**
     * Создает новый класс дел
     * @example $.projectsSet.createProjectClass({ Name: 'Новый класс', Section: 'Вкладка1', Icon: 'Computer' })
     */
    async function createProjectClass (params) {
        const logic = () => {
            return c1request({
                type: 'post',
                url: '/api/ObjectClasses/CreateObjectClass',
                body: params,
            });
        };
        return LogAction('$.projectsSet.createProjectClass', logic);
    }

    /**
     * Полностью удаляет дело (в том числе и из архива) по указанному Id, возвращает true при успешном удалении
     * @example $.projectsSet.deleteProject(projectId)
     */
    async function deleteProject (projectId) {
        const logic = async () => {
            await c1request({
                type: 'put',
                url: '/api/projects/Archive?Id=' + projectId,
            });
            return (await c1request({
                type: 'delete',
                url: '/api/Projects/DeleteProject/' + projectId,
            })).result.IsSuccess;
        };
        return LogAction('$.projectsSet.deleteProject', logic);
    }

    /**
     * Удаляет класс дела
     * @example $.projectsSet.deleteProjectClass(id)
     */
    async function deleteProjectClass (projectClassId) {
        const logic = () => {
            return c1request({
                type: 'delete',
                url: `/api/ObjectClasses/DeleteObjectClass/{Id}?request.id=${projectClassId}`,
            });
        };
        return LogAction('$.projectsSet.deleteProjectClass', logic);
    }

    /**
     * Сохраняет настройки проекта, для получения настроек можно использовать $.projectsGet.projectSettings(projectId)
     * @example $.projectsSet.projectSettings(projectSettingsStructure)
     */
    async function projectSettings (params) {
        const logic = () => {
            return c1request({
                type: 'put',
                url: `/api/ProjectSettings/SaveSettings`,
                body: params,
            });
        };
        return LogAction('$.projectsSet.projectSettings', logic);
    }

    /**
     * Добавляет дело в системный блок ссылки
     * @example relatedProject({ Id: '02df7e90-c387-448e-bb1b-acdb00e44a88', Type: 'ProjectToProjects', RelatedObjects: [{ Id: 'c6cad613-c057-419e-a08a-acde0085521c', Type: 'Project' }] })
     */
    async function relatedProject (params) {
        const logic = async () => {
            return (await c1request({
                type: 'put',
                url: `/api/RelatedObjects/SaveRelatedObjects`,
                body: params,
            }));
        };
        return LogAction('$.projectsSet.relatedProject', logic);
    }

    /**
     * Обновляет одну или более вкладок на деле, в зависимости от переданных параметров
     * @example $.projectsSet.updateProject(projectStructure, 'allTabs')
     */
    async function updateProject(params, tabs, tabName) {
        const logic = async () => {
            if (tabs === 'mainTab') {
                return c1request({
                    type: 'put',
                    url: '/api/Projects/UpdateProjectSummary',
                    body: params,
                });
            }
            if (tabs === 'allTabs') {
                return c1request({
                    type: 'put',
                    url: '/api/Projects/UpdateProjectWithBlocks',
                    body: params,
                });
            }
            if (tabs === 'oneTab') {
                const projectType = await projectTypes(params.ProjectType.Name);
                const tab = projectType.Tabs.find((tabData) => tabData.Name === tabName);
                if (!tab || !tab.Id)
                    throw `$.projectsSet.updateProject - no tab found with name2 ${tabName}`;
                params.ProjectTypeTabId = tab.Id;
                return c1request({
                    type: 'put',
                    url: '/api/Projects/UpdateProjectTab',
                    body: params,
                });
            }
        };
        // @ts-ignore
        return LogAction('$.projectsSet.updateProject', logic);
    }

    /**
     * Возвращает системные типы сценариев
     * @example $.scriptsGet.scriptTypes()
     */
    var scriptTypes = async () => {
        const logic = () => c1request({
            type: 'post',
            url: '/api/dictionary/getdictionaryitems',
            body: { PageSize: 999, SystemName: 'AutomationScriptType' },
        });
        return LogAction('$.scriptsGet.scriptTypes', logic);
    };

    /**
     * Получает основные настройки инстанса
     * @example $.settingsGet.generalSettings()
     */
    function generalSettings$1 () {
        const logic = () => {
            return c1request({
                type: 'get',
                url: '/api/GeneralSettings/GetGeneralSettings',
            });
        };
        return LogAction('$.settingsGet.generalSettings', logic);
    }

    /**
     * Сохраняет настройки инстанса
     * @example $.settingsSet.generalSettings(settingsStructure)
     */
    async function generalSettings (params) {
        const logic = () => {
            return c1request({
                type: 'put',
                url: '/api/GeneralSettings/SaveGeneralSettings',
                body: params,
            });
        };
        return LogAction('$.settingsSet.generalSettings', logic);
    }

    /**
     * Создает новый UUID
     * @example $.utils.uuidv4()
     */
    var uuidv4 = async () => {
        const logic = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            // eslint-disable-next-line no-bitwise
            const r = (Math.random() * 16) | 0;
            // eslint-disable-next-line no-bitwise
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
        return LogAction('$.utils.uuidv4', logic);
    };

    async function get$1(objectTypeId) {
        const logic = () => {
            return c1request({
                type: 'get',
                url: `/api/v2/objectTypes/${objectTypeId}`,
            });
        };
        return LogAction('$.objectTypes.get', logic);
    }

    async function patch(objectId, body) {
        const logic = () => {
            return c1request({
                type: 'patch',
                url: `/api/v2/objects/${objectId}`,
                body,
            });
        };
        return LogAction('$.objects.patch', logic);
    }

    class Case {
        value;
        type;
        constructor(value) {
            this.value = value;
        }
        async loadType() {
            this.type = await get$1(this.value.CaseType.Id);
        }
        async patch(data) {
            this.value = await patch(this.value.Id, data);
            return this.value;
        }
        getFieldValue(fieldId) {
            const fields = this.value.Fields;
            if (!fields) {
                throw new Error(`Case ${this.value.Id} - no field with id or tag ${fieldId}`);
            }
            return fields[fieldId];
        }
        getFieldInfo(fieldId) {
            const field = this.getFieldsMap()[fieldId];
            if (!field) {
                throw new Error(`Case ${this.value.Id} - no field with id or tag ${fieldId}`);
            }
            return field;
        }
        getFieldsMap() {
            const fields = {};
            this.type.Blocks.forEach((block) => block.Lines.forEach((line) => line.Fields.forEach((field) => {
                if (field.Id) {
                    fields[field.Id] = {
                        ...field,
                        lineId: line.Id,
                        blockId: block.Id,
                    };
                }
                if (field.Tag) {
                    fields[field.Tag] = {
                        ...field,
                        lineId: line.Id,
                        blockId: block.Id,
                    };
                }
            })));
            return fields;
        }
    }
    async function get(objectId) {
        const logic = () => {
            return c1request({
                type: "get",
                url: `/api/v2/objects/${objectId}`,
            });
        };
        return new Case(await LogAction("$.objects.get", logic));
    }

    exports.debug = debug;
    exports.getDictValues = dictValues;
    exports.getDicts = dicts;
    exports.getFormById = formById;
    exports.getFormPathsByName = pathsByName$1;
    exports.getFormValuesByName = valuesByName$1;
    exports.getFormValuesByPath = valuesByPath$1;
    exports.getGeneralSettings = generalSettings$1;
    exports.getProjectPathsByName = pathsByName;
    exports.getProjectProjectBlocksTypes = projectBlocksTypes;
    exports.getProjectProjectById = projectById;
    exports.getProjectProjectClasses = projectClasses;
    exports.getProjectProjectSettings = projectSettings$1;
    exports.getProjectProjectTypes = projectTypes;
    exports.getProjectProjectsByFilters = projectsByFilters;
    exports.getProjectRelatedProjects = relatedProjects;
    exports.getProjectValuesByName = valuesByName;
    exports.getProjectValuesByPath = valuesByPath;
    exports.getScriptTypes = scriptTypes;
    exports.objectsGet = get;
    exports.objectsPatch = patch;
    exports.setCreateDict = createDict;
    exports.setDeleteDict = deleteDict;
    exports.setGeneralSettings = generalSettings;
    exports.setProjectCreateProject = createProject;
    exports.setProjectCreateProjectClass = createProjectClass;
    exports.setProjectDeleteProject = deleteProject;
    exports.setProjectDeleteProjectClass = deleteProjectClass;
    exports.setProjectProjectSettings = projectSettings;
    exports.setProjectRelatedProject = relatedProject;
    exports.setProjectUpdateProject = updateProject;
    exports.setProjectValueToBlock = valueToBlock;
    exports.settings = settings;
    exports.useSettingsStore = useSettingsStore;
    exports.uuidv4 = uuidv4;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
