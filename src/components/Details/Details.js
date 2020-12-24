import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@material-ui/core";
import classes from "./Details.module.css";
import axios from "axios";

export default class Details extends Component {
  state = {
    quote: [],
  };
  componentDidMount = () => {
    axios
      .get(
        "https://breakingbadapi.com/api/quote?author=" +
          this.props.location.state.data.name
      )
      .then((res) => {
        this.setState({
          quote: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    const data = this.props.location.state.data;
    return (
      <div>
        <Card className={classes.Card}>
          <div>
            <CardContent>
              <Typography className={classes.title} variant="h5" component="h2">
                <span className={classes.Label}>Name : </span>
                {data.name}
              </Typography>
              <Typography variant="h5" component="h2">
                <span className={classes.Label}>DOB : </span>
                {data.birthday}
              </Typography>
              <Typography variant="h6" component="h4">
                <span className={classes.Label}>Status : </span>
                {data.status}
              </Typography>
              <Typography variant="h6" component="h4">
                {data.nickname ? (
                  <span>
                    {" "}
                    <span className={classes.Label}>Nickname : </span>{" "}
                    {data.nickname}
                  </span>
                ) : null}
              </Typography>
              <Typography variant="h6" component="h4">
                <span className={classes.Label}>Actor : </span>
                {data.portrayed}
              </Typography>
              <Typography variant="h6" component="h4">
                <span className={classes.Label}>Occupation : </span>
                {
                  <ul>
                    {data.occupation.map((it, pos) => (
                      <li key={pos}>{it}</li>
                    ))}
                  </ul>
                }
              </Typography>
              <Typography variant="h6" component="h4">
                <span className={classes.Label}>Appearance : </span>
                {
                  <ul>
                    {data.appearance.map((it, pos) => (
                      <li key={pos}>Season {it}</li>
                    ))}
                  </ul>
                }
              </Typography>
              <Typography variant="h6" component="h4">
                <span className={classes.Label}>Quotes : </span>
                {
                  <ul>
                    {this.state.quote.map((it, pos) => (
                      <li key={pos}>{it.quote}</li>
                    ))}
                  </ul>
                }
              </Typography>
            </CardContent>
          </div>
          <CardMedia
            className={classes.cover}
            image={data.img}
            title="character image"
          />
        </Card>
      </div>
    );
  }
}
