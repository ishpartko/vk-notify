import User from '../User';
import dataManager from '../DataManager';
import UI from './UI';
/**
 *
 * @export
 * @class ExtInterface
 */
export default class ExtInterface {
  public $mainNode: HTMLElementTagNameMap['li'];
  public $UInode: HTMLDivElement;
  public ui: UI;

  /**
   *Creates an instance of ExtInterface.
   * @param {HTMLUListElement} $pageElement
   * @memberof ExtInterface
   */
  constructor($pageElement: HTMLUListElement) {
    this.appendMainNodeToVKpage($pageElement);
    this.$UInode = document.getElementById(
      'AlarmUserExtensionInterface',
    ) as HTMLDivElement;
    this.$mainNode = document.getElementById(
      'AlarmUserExtension',
    ) as HTMLLIElement;
    this.ui = new UI(this.$UInode);
  }

  public onclick$MainNode() {
    const users = dataManager.getVKusers();
    if (users) {
      this.ui.showUsers(users);
    }
  }

  /**
   * @private
   * @param {HTMLUListElement} $pageElement
   * @param {()=> void} handler
   * @memberof ExtInterface
   */
  private appendMainNodeToVKpage($pageElement: HTMLUListElement) {
    const $icon: HTMLDivElement = document.createElement('div');
    $icon.className = 'ChatSettingsRoundedIcon ChatSettingsRoundedIcon--gear';
    const $div: HTMLElementTagNameMap['div'] = document.createElement('div');
    $div.className = 'ListItem__main';
    $div.textContent = 'Упомянуть пользователей';
    $div.insertBefore($icon, $div.firstChild);
    const $UIdiv: HTMLDivElement = document.createElement('div');
    $UIdiv.id = 'AlarmUserExtensionInterface';
    $UIdiv.style.position = 'absolute';
    const $mainNode: HTMLLIElement = document.createElement('li');
    $mainNode.id = 'AlarmUserExtension';
    $mainNode.className =
      'ListItem ListItem--chevron ListItem--selectable ListItem--border ListItem--can-be-hovered';
    $div.appendChild($UIdiv);
    $mainNode.appendChild($div);
    $mainNode.addEventListener('click', () => {
      this.onclick$MainNode();
    });
    $pageElement.appendChild($mainNode);
  }
}
