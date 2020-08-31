import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement} from 'react';

const {Col, Row} = require('react-bootstrap');

const useStyles = makeStyles((theme) => ({
   card: {
      borderRadius: 4,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(63, 63, 68, 0.1)',
      backgroundColor: '#ffffff',
      marginBottom: 20,
      marginTop: -15,
   },
   content: {
      padding: '15px 15px 10px 15px',
   },
   numbers: {
      fontSize: '2em',
      textAlign: 'right',
      p: {
         margin: 0,
      },
   },
   footer: {
      padding: 0,
      height: 40,
      backgroundColor: 'transparent',
      lineHeight: 1,
      hr: {
         marginTop: 5,
         marginBottom: 5,
      },
   },
   stats: {
      color: '#a9a9a9',
   },
   bigIcon: {
      fontSize: '4em',
      minHeight: 64,
      i: {
         fontWeight: 'bold',
         lineHeight: 59,
      },
   },
   spinner: {
      margin: 125,
      marginLeft: 200,
   },
}));

type Props = {
   value: number;
   text: string;
   updateIcon: string;
   updateIconText: string;
   valueIcon: string;
};

const KPICard: React.FC<Props> = ({value, text, updateIcon, updateIconText, valueIcon}: Props): ReactElement => {
   const classes = useStyles();
   return (
      <div className={classes.card}>
         <div className={classes.content}>
            <Row>
               <Col xs={5} lg={5}>
                  <div className={classes.bigIcon}>
                     <i className={valueIcon} />
                  </div>
               </Col>
               <Col xs={7} lg={7}>
                  <div className={classes.numbers}>
                     <p>{text}</p>
                     {value || <CircularProgress />}
                  </div>
               </Col>
            </Row>
            <div className={classes.footer}>
               <hr />
               <div className={classes.stats}>
                  <i className={updateIcon} /> {updateIconText}
               </div>
            </div>
         </div>
      </div>
   );
};

export default KPICard;
