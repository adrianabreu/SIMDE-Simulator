import * as React from 'react';
import { BaseRegisterComponent } from './BaseRegisterComponent';
import IntervalModalComponent from './modal/IntervalModalComponent';

import { translate } from 'react-i18next';
import { t } from 'i18next';

import './RegisterComponent.scss';

declare var window: any;

class RegisterComponent extends BaseRegisterComponent {

   history: any[];
   historyLength = 10;

   constructor(props: any) {
      super(props);
      // Bind functions for not losing context
      this.openWithAddInterval = this.openWithAddInterval.bind(this);
      this.openWithRemoveInterval = this.openWithRemoveInterval.bind(this);
      this.addInterval = this.addInterval.bind(this);
      this.parseInterval = this.parseInterval.bind(this);
      this.removeInterval = this.removeInterval.bind(this);
   }

   openWithAddInterval() {
      this.setState({ open: true, onAccept: this.addInterval });
   }

   openWithRemoveInterval() {
      this.setState({ open: true, onAccept: this.removeInterval });
   }

   render() {
      return (
         <div className='registerPanel'>
            <div className='panel panel-default'>
               <div className='panel-heading'>{t(this.props.title)}</div>
               <div className='panel-body'>
                  <table className='table table-bordered'>
                     <tbody>
                        {
                           this.state.showableContent.map((row, i) => <tr key={`${this.state.title + i}`}>
                              <td width='30%' key={`${this.state.title + i + 65}`}>{row.index}</td>
                              <td width='70%' key={`${this.state.title + i + 131}`}>{row.value}</td>
                           </tr>)
                        }
                     </tbody>
                  </table>
               </div>
               <div className='panel-footer'>
                  <button type='button' className='btn btn-xs' onClick={this.openWithAddInterval}><i className='fa fa-plus' aria-hidden='true'></i>
                  </button>
                  <button type='button' className='btn btn-xs' onClick={this.openWithRemoveInterval}><i className='fa fa-minus' aria-hidden='true'></i></button>
                  <button type='button' className='btn btn-xs'><i className='fa fa-check' aria-hidden='true'></i></button>
                  <button type='button' className='btn btn-xs'><i className='fa fa-times' aria-hidden='true'></i></button>
                  <button type='button' className='btn btn-xs'><i className='fa fa-repeat' aria-hidden='true'></i></button>
               </div>
            </div>
            {<IntervalModalComponent title={this.props.title} onAccept={this.state.onAccept} open={this.state.open} />}
         </div>);
   }
}

export default translate('common')(RegisterComponent);