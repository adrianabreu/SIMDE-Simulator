import * as React from 'react';
import { BaseComponent } from './BaseComponent';
declare var window: any;

export class JumpPredictionComponent extends BaseComponent {

   history: any[];
   historyLength: 10;

   constructor(props: any) {
      super(props);
   }

   buildShowableContent(data): any[] {
      let toReturn = [];
      for (let i = 0; i < data.length; i++) {
         toReturn.push(data[i] ? data[i] : ' ');
      }
      return toReturn;
   }

   render() {
      return (
         <div className='panel panel-default'>
            <div className='panel-heading'>{this.props.title}</div>
            <div className='panel-body'>
               <table className='table table-bordered'>
                  <tbody>
                     {
                        this.state.showableContent.map((row, i) => <tr key={`${this.state.title + i}`}>
                           <td width='40%' key={`${this.state.title + i + 65}`}>{i}</td>
                           <td width='60%' key={`${this.state.title + i + 131}`}>{row}</td>
                        </tr>)
                     }
                  </tbody>
               </table>
            </div>
         </div>);
   }
}
