import * as React from 'react';
import { IntervalModalComponent } from './modal/IntervalModalComponent';

import * as _ from 'lodash';
import './ROBMapperComponent.scss';

declare var window: any;

export class ROBMapperComponent extends React.Component<any, any> {

   history: any[];
   historyLength = 10;
   maxElem = 64;
   show: Set<number>;
   open: boolean;

   constructor(props: any) {
      super(props);
      this.state = {
         title: null,
         content: new Array(64).fill(0),
         contentShowable: [],
         show: this.show,
         open: false
      };
      this.history = [];
      this.show = new Set();
      this.open = false;
      for (let i = 0; i < 8; i++) {
         this.show.add(i);
      }

      // Bind functions for not losing context
      this.addInterval = this.addInterval.bind(this);
      this.removeInterval = this.removeInterval.bind(this);
      this.openWithAddInterval = this.openWithAddInterval.bind(this);
      this.openWithRemoveInterval = this.openWithRemoveInterval.bind(this);

      window.state[this.props.title] = (data) => {
         let newState = {
            content: data.content.slice(),
            contentShowable: []
         };
         this.show.forEach(e => {
            newState.contentShowable.push({ index: e, value: data.content[e] });
         });
         // Set a limit for history
         if (!(this.history.length < this.historyLength)) {
            this.history.shift();
         }
         this.history.push(newState.contentShowable);

         this.setState(newState);
      };
   }

   addInterval(toAdd: string) {
      if (toAdd) {
         let setToAdd = this.parseInterval(toAdd);
         setToAdd.forEach(e => this.show.add(e));
         this.show = new Set(Array.from(this.show).sort((a, b) => a - b));
         this.buildShowableContent();
      } else {
         this.setState({ open: false });
      }
   }

   parseInterval(toAdd: string): Set<number> {
      let newInterval = new Set<number>();
      let cadena = toAdd;
      cadena.split(',').map(e => {
         if (e.indexOf('-') !== -1) {
            let range = e.split('-');
            let num1 = +range[0];
            let num2 = +range[1];
            if (num1 >= this.maxElem) {
               num1 = this.maxElem - 1;
            }
            if (num2 >= this.maxElem) {
               num2 = this.maxElem - 1;
            }
            if (num1 < num2) {
               for (; num1 <= num2; num1++) {
                  newInterval.add(num1);
               }
            } else {
               for (; num2 <= num1; num2++) {
                  newInterval.add(num2);
               }
            }
         } else {
            let num = +e;
            if (num < this.maxElem) {
               newInterval.add(+e);
            }
         }
      });
      return newInterval;
   }

   removeInterval(toRemove: string) {
      if (toRemove) {
         let setToRemove = this.parseInterval(toRemove);
         setToRemove.forEach(e => {
            if (this.show.has(e)) {
               this.show.delete(e);
            }
         });
         this.show = new Set(Array.from(this.show).sort((a, b) => a - b));
         this.buildShowableContent();
      } else {
         this.setState({ open: false });
      }
   }

   buildShowableContent() {
      let newState = { contentShowable: [], show: this.show, open: false };
      this.show.forEach(e => {
         newState.contentShowable.push({ index: e, value: this.state.content[e] });
      });
      this.setState(newState);
   }

   openWithAddInterval() {
      this.setState({ open: true, onAccept: this.addInterval });
   }

   openWithRemoveInterval() {
      this.setState({ open: true, onAccept: this.removeInterval });
   }

   render() {
      return (
         <div className='panel panel-default'>
            <div className='panel-heading'>{this.props.title}</div>
            <div className='panel-body'>
               <table className='table table-bordered'>
                  <tbody>
                     {
                        this.state.contentShowable.map((row, i) => <tr key={`${this.state.title + i}`}>
                           <td width='40%' key={`${this.state.title + i + 65}`}>{row.index}</td>
                           <td width='60%' key={`${this.state.title + i + 131}`}>{row.value}</td>
                        </tr>)
                     }
                  </tbody>
               </table>
            </div>
            <div className='panel-footer'>
               <button type='button' className='btn btn-xs' onClick={this.openWithAddInterval}><i className='fa fa-plus' aria-hidden='true'></i>
               </button>
               <button type='button' className='btn btn-xs' onClick={this.openWithRemoveInterval}><i className='fa fa-minus' aria-hidden='true'></i></button>
            </div>
            <IntervalModalComponent title={this.props.title} onAccept={this.state.onAccept} open={this.state.open} />
         </div>);
   }
}