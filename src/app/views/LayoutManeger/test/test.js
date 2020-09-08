import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = {
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  }
}

function MyCard(props) {
  return (
    <Card>
      <ButtonBase
          className={props.classes.cardAction}
          onClick={event => { ... }}
      >
        <CardMedia ... />
        <CardContent>...</CardContent>
      </ButtonBase>
    </Card>
  );
}

export default withStyles(styles)(MyCard)