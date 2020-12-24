import React, { Component } from "react";
import axios from "axios";
import { Pagination } from "@material-ui/lab";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import classes from "./List.module.css";
import { Link } from "react-router-dom";

export default class List extends Component {
  state = {
    page: 1,
    prevPage: 1,
    count: 0,
    listData: [],
    showList: [],
    category: "",
    mainList: [],
    nameQuery: "",
  };
  componentDidMount = () => {
    axios
      .get("https://breakingbadapi.com/api/characters")
      .then((res) => {
        this.setState({
          listData: res.data,
          mainList: res.data,
          count:
            res.data.length % 10 === 0
              ? res.data.length / 10
              : Math.floor(res.data.length / 10) + 1,
          showList: res.data.filter((item, pos) => pos >= 0 && pos < 10),
        });
      })
      .catch((err) => console.log(err));
  };
  componentDidUpdate = () => {
    if (this.state.page !== this.state.prevPage) {
      const myList = this.state.listData.filter(
        (item, pos) =>
          pos >= (this.state.page - 1) * 10 && pos < this.state.page * 10
      );
      this.setState({
        showList: myList,
        prevPage: this.state.page,
      });
    }
  };

  handleChange = (event, value) => {
    this.setState({
      page: value,
    });
    window.scrollTo(0, 0);
  };
  handleCategory = (e) => {
    this.setState({
      category: e.target.value,
    });
    const myList = this.state.mainList.filter(
      (item) => item.category.indexOf(e.target.value) !== -1
    );
    this.setState({
      nameQuery: "",
      listData: myList,
      count:
        myList.length % 10 === 0
          ? myList.length / 10
          : Math.floor(myList.length / 10) + 1,
      page: 1,
      prevPage: 1,
      showList: myList.filter((item, pos) => pos >= 0 && pos < 10),
    });
  };

  searchHandler = (e) => {
    const nameQuery = e.target.value.toLowerCase();

    this.setState({
      nameQuery: nameQuery,
    });
    const myList = this.state.mainList.filter(
      (item) =>
        item.name.toLowerCase().indexOf(nameQuery) != -1 &&
        item.category.indexOf(this.state.category) !== -1
    );
    this.setState({
      listData: myList,
      showList: myList.filter((item, pos) => pos >= 0 && pos < 10),
      page: 1,
      prevPage: 1,
      count:
        myList.length % 10 === 0
          ? myList.length / 10
          : Math.floor(myList.length / 10) + 1,
    });
  };

  handleClearFilter = () => {
    this.setState({
      nameQuery: "",
      listData: this.state.mainList,
      count:
        this.state.mainList.length % 10 === 0
          ? this.state.mainList.length / 10
          : Math.floor(this.state.mainList.length / 10) + 1,
      page: 1,
      prevPage: 1,
      showList: this.state.mainList.filter((item, pos) => pos >= 0 && pos < 10),
      category: "",
    });
  };
  render() {
    console.log(this.state.listData);
    console.log(this.state.nameQuery);
    const listCard = this.state.showList.map((item) => {
      return (
        <Link
          to={{ pathname: "/" + item.char_id, state: { data: item } }}
          className={classes.root}
          key={item.char_id}
        >
          <Card className={classes.Card}>
            <CardContent>
              <Typography className={classes.title} variant="h5" component="h2">
                <span className={classes.Label}>Name : </span>
                {item.name}
              </Typography>
              <Typography variant="h5" component="h2">
                <span className={classes.Label}>DOB : </span>
                {item.birthday}
              </Typography>
              <Typography variant="h6" component="h4">
                <span className={classes.Label}>Status : </span>
                {item.status}
              </Typography>
              <Typography variant="h6" component="h4">
                <span className={classes.Label}>Occupation : </span>
                {
                  <ul>
                    {item.occupation.map((it, pos) => (
                      <li key={pos}>{it}</li>
                    ))}
                  </ul>
                }
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">See Details</Button>
            </CardActions>
          </Card>
        </Link>
      );
    });
    return (
      <div>
        <div className={classes.Filter}>
          <FormControl className={classes.FormControl} variant="filled">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.category}
              onChange={this.handleCategory}
            >
              <MenuItem value={"Breaking Bad"}>Breaking Bad</MenuItem>
              <MenuItem value={"Better Call Saul"}>Better Call Saul</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="input-with-icon-textfield"
            label="Search"
            variant="outlined"
            value={this.state.nameQuery}
            placeholder="name of character"
            onChange={this.searchHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            size="small"
            color="secondary"
            onClick={this.handleClearFilter}
          >
            Clear Filter
          </Button>
        </div>
        <div className={classes.CardWrap}>{listCard}</div>

        <Pagination
          count={this.state.count}
          page={this.state.page}
          onChange={this.handleChange}
          color="primary"
          className={classes.Pagination}
        />
      </div>
    );
  }
}
