import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import { RaisedButton }  from 'material-ui'

const ACTIVE = {color: 'red'};
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const List = require('material-ui/lib/lists/list');
const ListItem = require('material-ui/lib/lists/list-item');
const SvgIcon = require('material-ui/lib/svg-icon');
const ListDivider = require('material-ui/lib/lists/list-divider');

let injectTapEventPlugin = require("react-tap-event-plugin");
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      days: [
        {
          name: 'ПН',
          lessons: [
            {
              name: 'Блок1. АСНД',
              lecturer: 'Польшакова О.М',
              room: '18-418 лекція',
              time: '10:25 - 12:00'
            },
            {
              name: 'Іноземна мова професійного спрямування - 2',
              lecturer: 'Колісник М.П.',
              room: '18-411',
              time: '12:20 - 13:55'
            }
          ]
        },
        {
          name: 'ВТ',
          lessons: [
            {
              name: 'Блок1. Тестування та забезпечення кості програмних систем',
              lecturer: 'Максимюк А.В.',
              room: '18-415 лабораторне заняття',
              time: '10:25 - 12:00'
            },
            {
              name: 'Технології розробки програмного забезпечення - 4. Управління проектами',
              lecturer: 'Савицький А.Й.',
              room: '18-418 лекція',
              time: '12:20 - 13:55'
            }
          ]
        },
        {
          name: 'СР',
          lessons: [
            {
              name: 'CAD/CAM/CAE системи',
              lecturer: 'Поліщук М.М.',
              room: '18-419 лекція',
              time: '10:25 - 12:00'
            },
            {
              name: 'Захист інформації в комп\'ютерних мережах',
              lecturer: 'Пасько В.П.',
              room: '18-419 лекція',
              time: '12:20 - 13:55'
            }
          ]
        },
        {
          name: 'ЧТ',
          lessons: [
            {
              name: 'Блок1. Тестування та забезпечення кості програмних систем',
              lecturer: 'Савицький А.Й.',
              room: '18-418 лекція',
              time: '10:25 - 12:00'
            },
            {
              name: 'Іноземна мова професійного спрямування - 2',
              lecturer: 'Колісник М.П.',
              room: '18-411',
              time: '12:20 - 13:55'
            }
          ]
        },
        {
          name: 'ПТ',
          lessons: [
            {
              name: 'Корпоративні інформаційні системи та технології',
              lecturer: 'Тимошин Ю.А.',
              room: '18-418а лабораторне заняття',
              time: '8:30 - 10:05'
            },
            {
              name: 'Корпоративні інформаційні системи та технології',
              lecturer: 'Тимошин Ю.А.',
              room: '18-432 лекція',
              time: '8:30 - 10:05'
            },
            {
              name: 'Захист інформації в комп\'ютерних мережах',
              lecturer: 'Пасько В.П.',
              room: '18-419 лекція',
              time: '12:20 - 13:55'
            }
          ]
        }
      ]

    }
  }

  render() {
    return (
      <div>
        <div style={{
          width: '100%',
          lineHeight: '40px',
          background: '#00bcd4',
          color: '#fff',
          fontWeight: '500',
          textAlign: 'center',
          textTransform: 'uppercase'
        }}>
          Campus timetable
        </div>
        <Tabs>
        {this.state.days.map(function(day, index) {
          return (
            <Tab label={day.name} key={index} >
              <List>
              {day.lessons.map(function(item, number) {
                number++;
                return (
                  <div>
                    <ListItem
                      primaryText={item.name}
                      secondaryText={<LessonInfo room={item.room} lecturer={item.lecturer} time={item.time} />}
                      leftIcon={<i style={{
                        display: 'block',
                        top:'27%',
                        left:'12px',
                        padding:'0',
                        background: 'url(img/number' + number + '.svg) no-repeat #FFA5C4',
                        borderRadius:'36px',
                        backgroundSize: '48px 48px',
                        width: '48px',
                        height: '48px'
                      }}></i>}
                    />
                    <ListDivider/>
                  </div>
                )
              })}
              </List>
            </Tab>
          )
        })}
        </Tabs>
      </div>

    )
  }
}

class LessonInfo extends React.Component {
  render() {
    return (
      <div>
        <div style={{fontSize: '13px', paddingTop: '8px', color: '#03a9f4'}}>{this.props.lecturer}</div>
        <div>
          <div style={{
            width: '70%',
            float: 'left',
            padding: '5px 0',
            fontSize: "14px",
            fontWeight: '400'
          }}>{this.props.room}</div>
          <div style={{
            width: '30%',
            float: 'right',
            color: '#ff4081',
            padding: '5px 0',
            textAlign: 'right',
            fontSize: "14px",
            fontWeight: '400'
          }}>{this.props.time}</div>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    )
  }
}

LessonInfo.defaultProps = {
  lecturer: '',
  room: '',
  time: ''
};

render((
  <Router >
    <Route path="/" component={App}>


    </Route>
  </Router>
), document.getElementById('content'));
