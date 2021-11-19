import React from 'react';
import classNames from 'classnames';

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (spots) => {
    let result = "";
    if (spots > 1) {
      result = `${spots} spots remaining`;
    } else if (spots === 1) {
      result = `${spots} spot remaining`
    } else if (spots === 0) {
      result = `no spots remaining`
    }
    return result;
  }

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}