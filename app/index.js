import React from 'react'
import { render } from 'react-dom'

const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const List = require('material-ui/lib/lists/list');
const ListItem = require('material-ui/lib/lists/list-item');
const ListDivider = require('material-ui/lib/lists/list-divider');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const IconButton = require('material-ui/lib/icon-button');
const NavigationMoreVert = require('material-ui/lib/svg-icons/navigation/more-vert');
const AppBar = require('material-ui/lib/app-bar');

let injectTapEventPlugin = require("react-tap-event-plugin");
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class App extends React.Component {
  constructor() {
    super();
    this.changeWeek = this.changeWeek.bind(this);
    this.state = {
      currentWeek: '1',
      groupName: 'ft-42',
      weeks: {
        1: {
          days: []
        },
        2: {
          days: []
        }
      }
    }
  }

  contractDayName(day) {
    switch (day) {
      case 'Понеділок':
        return 'ПН';
        break;
      case 'Вівторок':
        return 'ВТ';
        break;
      case 'Середа':
        return 'СР';
        break;
      case 'Четвер':
        return 'ЧТ';
        break;
      case 'П\’ятниця':
        return 'ПТ';
        break;
      case 'Субота':
        return 'СБ';
        break;
    }
  }

  getTimetableFromAPI() {
    fetch('http://api.rozklad.org.ua/v2/groups/' + this.state.groupName + '/timetable')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        //parse data to convert to arrays and remove empty days
        //week 1
        json.data.weeks["1"].days = Object.keys(json.data.weeks["1"].days).map(key => json.data.weeks["1"].days[key]);
        json.data.weeks["1"].days.map(function(item) {
          if (!item.lessons.length) {
            json.data.weeks["1"].days.pop(item);
          }
        });

        //week 2
        json.data.weeks["2"].days = Object.keys(json.data.weeks["2"].days).map(key => json.data.weeks["2"].days[key]);
        json.data.weeks["2"].days.map(function(item) {
          if (!item.lessons.length) {
            json.data.weeks["2"].days.pop(item);
          }
        });
        this.setState({weeks: json.data.weeks});
      }.bind(this))
      .catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  componentDidMount() {
    this.getTimetableFromAPI();
  }

  changeWeek(event, value) {
    this.setState({currentWeek: value});
  }

  render() {
    return (
      <div>
        <AppBar
          title="CAMPUS TIMETABLE"
          style={{boxShadow: ' 0 1px 0px rgba(0, 0, 0, 0.24)', backgroundColor: '#208843'}}
          showMenuIconButton={false}
          iconElementRight={
            <IconMenu
              value={this.state.currentWeek}
              iconButtonElement={<IconButton>
                <NavigationMoreVert />
              </IconButton>}
              onChange={this.changeWeek}
            >
              <MenuItem primaryText="1 тиждень" value="1"/>
              <MenuItem primaryText="2 тиждень" value="2" />
            </IconMenu>
            } />
        <Tabs tabItemContainerStyle={{backgroundColor: '#208843'}}>
        {this.state.weeks[this.state.currentWeek].days.map(function(day) {
          return (
            <Tab label={this.contractDayName(day.day_name)} key={day.day_number} style={{backgroundColor: '#208843'}}>
              <List>
              {day.lessons.map(function(item) {
                return (
                  <div>
                    <ListItem
                      key={item.lesson_number}
                      primaryText={item.lesson_name}
                      secondaryText={<LessonInfo room={item.lesson_room} type={item.lesson_type} lecturer={item.teacher_name} timeStart={item.time_start.split(':', 2).join(':')} timeEnd={item.time_end.split(':', 2).join(':')} />}
                      leftIcon={<i style={{
                        display: 'block',
                        top: '27%',
                        left: '12px',
                        padding: '0',
                        background: 'url(img/number' + item.lesson_number + '.svg) no-repeat #FF5722',
                        borderRadius: '36px',
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
        }.bind(this))}
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
            width: '50%',
            float: 'left',
            padding: '5px 0',
            fontSize: "14px",
            fontWeight: '400'
          }}>{this.props.room + ' ' + this.props.type}</div>
          <div style={{
            width: '50%',
            float: 'right',
            color: '#ff4081',
            padding: '5px 0',
            textAlign: 'right',
            fontSize: "14px",
            fontWeight: '400'
          }}>{this.props.timeStart + ' - ' + this.props.timeEnd}</div>
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

render(<App />, document.getElementById('content'));
