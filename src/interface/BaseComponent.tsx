import * as React from 'react';
import { Queue } from '../core/Collections/Queue';

declare var window: any;

export abstract class BaseComponent extends React.Component<any, any> {

   history: any[];

   constructor(props: any) {
      super(props);
      this.state = {
         title: null,
         showableContent: [],
         showableHeader: []
      };
      this.history = new Array();
      window.state[this.props.title] = (data: { content: any, step: number }) => {
         let newState = {
            showableContent: []
         };
         if (data.step) {
            if (data.step === -1) {
               this.history = new Array();
            } else {
               newState.showableContent = this.history[this.history.length - data.step].content;
            }
         } else {
            newState = this.buildShowableContent(data.content);
            if (this.history.length < 10) {
               this.history.push(Object.assign({}, { content: newState.showableContent }));
            } else {
               this.history.shift();
               this.history.push(Object.assign({}, { content: newState.showableContent }));
            }
         }
         this.setState(newState);
      };
   }

   abstract buildShowableContent(data: any, size?: number): any;
}
