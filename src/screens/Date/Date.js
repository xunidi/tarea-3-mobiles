import * as React from 'react';
import styles from './Date.module.scss';
import moment from 'moment';
import { Calendar } from 'react-date-range';
import { es } from 'date-fns/esm/locale';
import { format, endOfDay, startOfDay } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import produce from 'immer/dist/immer';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Board from '../../Board/Board';
import Table from '../../components/Table/Table';
import SimpleBarChart from '../../components/Chart/SimpleBarChart';

export default (class Date extends React.PureComponent {
	state = {
        data:{
            headers:[{name:"X",value:"name"},{name:"Y1",value:"y1"},{name:"Y2",value:"y2"}],
            rows:{summary:[]}
        },
        x:
            {
                title: 'Xaxis',
                items: [],
                index: 'x',
                input: ''
            }
        ,
        y1:
            {
                title: 'Y1Axis',
                items: [],
                index: 'y1',
                input: ''
            }
            
        ,
        y2:
            {
                title: 'Y2Axix',
                items: [],
                index: 'y2',
                input: ''
            },
        date: undefined
	};

    componentDidMount() {
		//this.init();
    }

    onAddButtonClick = (board) => { 
        console.log('TCL: Date -> onHandleCalendar -> clic', board);
        let {x,y1,y2} = this.state;

        if ( x.input ==="" || y1.input ==="" ||  y2.input ==="") {
            return false;
        }

        const nextState = produce(this.state, (draft)=>{
            let data = {name:x.input,y1:y1.input,y2:y2.input};
            draft.data.rows.summary = draft.data.rows.summary.concat(data);
            draft['x'].items = draft['x'].items.concat(x.input);
            draft['y1'].items = draft['y1'].items.concat(y1.input);
            draft['y2'].items = draft['y2'].items.concat(y2.input);
            draft['x'].input = "";
            draft['y1'].input = "";
            draft['y2'].input = "";
        });
        this.setState(nextState);   
          
    };

	onHandleCalendar = (date) => {
       
		console.log('TCL: Date -> onHandleCalendar -> date', date);
		console.log('TCL: Date -> onHandleCalendar -> date', moment(date).format('YYYY-MM-DD'));
        const dateFormat = moment(date).format('DD-MM-YYYY');
        const nextState = produce(this.state, (draft) => {
			draft.x.input = dateFormat;
		});
        this.setState(nextState);
    };
    
    onRemoveItem = (index, property) => {
		const nextState = produce(this.state, (draft) => {
            draft[property].items.splice(index, 1);
		});
		this.setState(nextState);
	};

    onHandleInput = (event,board) =>{
        const value = event.target.value
        const nextState = produce(this.state, (draft) => {
            draft[board].input = value;
        });
        this.setState(nextState);
    }

	render() {
        const { date, x, y1, y2, data} = this.state;
        let dataGraph = data.rows.summary;
        console.log('grafica',dataGraph);
 
		return (
			<div className={styles.main_container}>
				<h2>Mis datos</h2>
					<div className={styles.inputs}>
						<label>X</label>
						<Input input={x.input} value={x.input} onChange={(event) => this.onHandleInput(event,'x')}/>
						
						<label>Y1</label>
						<Input input={y1.input} value={y1.input} onChange={(event) => this.onHandleInput(event,'y1')}/>
						<label>Y2</label>
						<Input input={y2.input} value={y2.input} onChange={(event) => this.onHandleInput(event,'y2')}/>
						<Button className={styles.button_add} type={'plus'} onClick={() => this.onAddButtonClick()}/>
					</div>

                    <div className={styles.calendar}>
                        <Calendar locale={es} date={date} rangeColors={[ '#3861f6' ]} color={'#3861f6'} onChange={this.onHandleCalendar} />
                    </div>
                    <div className={styles.export_buttons}>
                        <Button onClick={()=>{}}   label={'PDF'}/>
                        <Button onClick={() => { }} label={"EXCEL"} />
                    </div>

            
                    <div className={styles.second_container}>                              
                            <Board 
                                object={x}
                                index = {'x'}
                                onButtonClick={()=> this.onHandleButton()} 
                                onRemoveItem={(index) => this.onRemoveItem(index, 'x')}
                            />
                            <Board 
                                object={y1}
                                index={'y1'}
                                onButtonClick={()=> this.onHandleButton()} 
                                onRemoveItem={(index) => this.onRemoveItem(index, 'y1')}
                            />
                            <Board 
                                object={y2}
                                index={'y2'}
                                onButtonClick={()=> this.onHandleButton()} 
                                onRemoveItem={(index) => this.onRemoveItem(index, 'y2')}
                            />             
					</div>
                    <div className={styles.container_tables}>
                        <Table data={x.items} headers={x.title} />
                        <Table data={y1.items} headers={y1.title} />
                        <Table data={y2.items} headers={y2.title} />
                        
                   </div> 
                   <div>
                        <SimpleBarChart data={dataGraph} x={'name'} y1={'y1'} y2={'y2'} y1Axis={'left'} y2Axis={'left'} />
                    </div>
			</div>
		);
	}
});
