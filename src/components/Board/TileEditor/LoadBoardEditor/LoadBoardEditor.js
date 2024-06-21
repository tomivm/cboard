import React, { Fragment } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { CircularProgress, InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import useAllBoardsFetcher from './useAllBoardsFetcher';
import styles from './LoadBoardEditor.module.css';
import { Alert, AlertTitle, Pagination } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'sticky'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BoardPagination = ({ pagesCount, currentPage, handleChange }) => {
  return (
    <div className={styles.pagination}>
      <Pagination
        count={pagesCount}
        color="primary"
        size="large"
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
};

const LoadBoardEditor = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {
    allBoards,
    totalPages,
    loading,
    error,
    fetchBoards
  } = useAllBoardsFetcher();
  const [currentPage, setCurrentPage] = React.useState(1);

  const BoardsList = () => {
    return (
      <List className={styles.boardsList}>
        {allBoards?.map(board => (
          <Fragment key={board.id}>
            <ListItem button>
              <ListItemText primary={board.name} secondary="Titania" />
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    );
  };

  const handleClickOpen = () => {
    fetchBoards({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeOnPage = (event, page) => {
    setCurrentPage(page);
    fetchBoards({ page });
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginTop: '16px' }}
      >
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className={styles.boardsListContainer}>
          <BoardPagination
            handleChange={handleChangeOnPage}
            pagesCount={totalPages}
            currentPage={currentPage}
          />
          {loading && (
            <div className={styles.loaderContainer}>
              <CircularProgress />
            </div>
          )}
          {error && (
            <Alert severity="error">
              <AlertTitle>Error getting all your folders</AlertTitle>
              <Button color="primary" onClick={fetchBoards}>
                Try Again
              </Button>
            </Alert>
          )}
          {!loading && !error && <BoardsList />}
          <BoardPagination
            handleChange={handleChangeOnPage}
            pagesCount={totalPages}
            currentPage={currentPage}
          />
        </div>
      </Dialog>
    </>
  );
};

export default LoadBoardEditor;
