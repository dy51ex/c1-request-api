import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Сохраняет настройки инстанса
 * @example $.settingsSet.generalSettings(settingsStructure)
 */
export default async function (
  params: components['schemas']['CaseMap.Modules.GeneralSettings.Models.GeneralSettings.V42.GeneralSettingModel']
): Promise<components['schemas']['CaseMap.Modules.GeneralSettings.Models.GeneralSettings.GeneralSettingOverview']> {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.Modules.GeneralSettings.Models.GeneralSettings.GeneralSettingOverview']>({
      type: 'put',
      url: '/api/GeneralSettings/SaveGeneralSettings',
      body: params,
    });
  };
  return LogAction('$.settingsSet.generalSettings', logic);
}
