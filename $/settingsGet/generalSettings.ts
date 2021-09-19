import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Получает основные настройки инстанса
 * @example $.settingsGet.generalSettings()
 */
export default function (): Promise<components['schemas']['CaseMap.Modules.GeneralSettings.Models.GeneralSettings.GeneralSettingOverview']> {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.Modules.GeneralSettings.Models.GeneralSettings.GeneralSettingOverview']>({
      type: 'get',
      url: '/api/GeneralSettings/GetGeneralSettings',
    });
  };
  return LogAction('$.settingsGet.generalSettings', logic);
}
