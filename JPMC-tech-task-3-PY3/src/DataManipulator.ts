import { ServerRespond } from './DataStreamer';

export interface Row {
  //updated the interface with the correct schema
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  //changed the generateRow method to use and return the desired info
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2; //ABC is the 1st element
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2; //DEF is the 2nd element
    const ratio = priceABC/priceDEF;
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;
      return {
        //return the desired values
        price_abc: priceABC,
        price_def: priceDEF,
        ratio,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
          serverResponds[0].timestamp : serverResponds[1].timestamp,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio: undefined,
      };
    }
  }
