import * as React from 'react';
import styles from './Board.module.scss';
import List from '../components/List/List';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

class Board extends React.Component {
	state = {};

    componentDiMount() {}

    onRemoveItem = (idx,index) => {
        console.log('idxboard',index);
        const {onRemoveItem} = this.props;        
        onRemoveItem(idx, index);
    };

    render() {
        const {object, index} = this.props;
        return (
            <div  className={styles.board}>
                <div className={styles.group}>
                    <p className={styles.title}>{object.title}</p>
                </div>
                <div className={styles.container}>
                    <div className={styles.main}>
                        <List items={object.items} index={index} onRemoveItem={(idx) => this.onRemoveItem(idx,index)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;
