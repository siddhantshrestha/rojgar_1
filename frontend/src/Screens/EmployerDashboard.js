import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Chip,
  Typography,
  Grid,
  Card,
  CardMedia,
  Divider,
  Stack,
  //   Button,
  Rating,
  Container,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import CallIcon from "@mui/icons-material/Call";
import { useDispatch, useSelector } from "react-redux";
import { getEmployerProfileByEmployerIdAction } from "../actions/employerActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const EmployerDashboard = () => {
  const { employerProfile, loading } = useSelector(
    (state) => state.employerInfo
  );
  const dispatch = useDispatch();
  const params = useParams();

  // if (employerProfile) {
  //   console.log(
  //     moment(employerProfile.createdAt)._d.toString().split("GMT")[0]
  //   );
  // }

  useEffect(() => {
    if (params.userEmployerId) {
      console.log(params.userEmployerId);
      dispatch(
        getEmployerProfileByEmployerIdAction({
          id: params.userEmployerId,
        })
      );
    }
  }, [dispatch, params]);

  // console.log(employerProfile);

  return (
    <Container maxWidth="lg">
      {loading ? (
        <Grid
          item
          sx={{
            padding: "10px",
            display: "flex",
            flex: "1",
            justifyContent: "center",
          }}
        >
          <CircularProgress variant="indeterminate" />
        </Grid>
      ) : employerProfile ? (
        <Box
          xs={12}
          sx={{
            padding: 3,
            display: "flex",
            justifyContent: "center",
            margin: 2,
            flexDirection: "column",
          }}
        >
          <Paper
            elevation={3}
            sx={{ margin: 1, padding: "15px", width: "100%" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    alt="talent-img"
                    height="200"
                    image={
                      employerProfile.profile.image
                        ? employerProfile.profile.image
                        : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                    }
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid item>
                  <Typography variant="h5" gutterBottom>
                    Organization Name
                  </Typography>
                </Grid>
                <Typography variant="h6" mt={1}>
                  {employerProfile.profile.name}
                </Typography>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px 0px",
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    value={
                      employerProfile.profile.rating /
                      employerProfile.profile.ratingper
                    }
                    precision={0.5}
                    readOnly
                  />
                </Grid>
                <div className="rating-info">
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{ paddingLeft: 0.5, marginTop: 1 }}
                  >
                    {`${employerProfile.profile.ratingper} 
                    reviews`}
                  </Typography>
                </div>
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ paddingLeft: 0.5, marginTop: 1 }}
                  >
                    Total Projects:
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ paddingLeft: 0.5, marginTop: 1 }}
                  >
                    {employerProfile.posts.length}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={4} sx={{ marginTop: "20px" }}>
                <Chip
                  icon={<CircleIcon sx={{ fontSize: "14px" }} />}
                  label="Online"
                  color="success"
                  variant="outlined"
                />
                <Stack direction="row" mt={2}>
                  <LocationOnIcon
                    sx={{ fontSize: "21px", color: "red", marginRight: 1 }}
                  />
                  <Typography variant="body2" mt={0.4} gutterBottom>
                    {`${employerProfile.address.city} , 
                      ${employerProfile.address.country}`}
                  </Typography>
                </Stack>
                <Stack direction="row" mt={2}>
                  <CallIcon
                    sx={{ fontSize: "21px", color: "green", marginRight: 1 }}
                  />
                  <Typography variant="body2" mt={0.4} gutterBottom>
                    {employerProfile.profile.phoneNumber}
                  </Typography>
                </Stack>
                <Stack direction="row" mt={2}>
                  <BeenhereIcon
                    sx={{ fontSize: "21px", color: "green", marginRight: 1 }}
                  />
                  <Typography variant="body2" mt={0.4} gutterBottom>
                    {
                      moment(employerProfile.createdAt)
                        ._d.toString()
                        .split("GMT")[0]
                    }
                  </Typography>
                </Stack>
                <Grid item mt={2}>
                  <Link
                    to={`/employerEdit`}
                    state={employerProfile}
                    style={{
                      textDecoration: "none",
                      flex: 1,
                      color: "black",
                    }}
                  >
                    <Button
                      // onClick={() =>
                      //   navigate(`/employerEdit`, {
                      //     state: employerProfile,
                      //   })
                      // }
                      variant="outlined"
                    >
                      Edit
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              <Grid item xs={12} md={7} ml={2}>
                <Typography variant="h6" gutterBottom>
                  Description About Organization
                </Typography>
                <Typography variant="body1" mt={0.1} gutterBottom>
                  {employerProfile.profile.description}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={3}
            sx={{ margin: 1, display: "flex", padding: "15px", width: "100%" }}
          >
            <Grid
              container
              xs={6}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Stack>
                <Typography variant="h5" mt={1} gutterBottom>
                  Social Account
                </Typography>
              </Stack>
              <Divider />
              <Grid item sx={{ padding: "10px" }}>
                <EmailIcon
                  color="primary"
                  sx={{ fontSize: "20px", color: "maroon" }}
                />
                <Link to="#" underline="none" m={2} sx={{ marginTop: "10px" }}>
                  {employerProfile.profile.email}
                </Link>
              </Grid>
              <Grid item sx={{ padding: "10px" }}>
                <FacebookIcon color="primary" sx={{ fontSize: "21px" }} />
                <Link to="#" underline="none" m={2} sx={{ marginTop: "10px" }}>
                  {employerProfile.socialProfile.facebookId}
                </Link>
              </Grid>
              <Grid item sx={{ padding: "10px" }}>
                <GitHubIcon
                  color="primary"
                  sx={{ fontSize: "21px", color: "black" }}
                />
                <Link to="#" underline="none" m={2} sx={{ marginTop: "10px" }}>
                  {employerProfile.socialProfile.githubId}
                </Link>
              </Grid>
              <Grid item sx={{ padding: "10px" }}>
                <TwitterIcon color="primary" sx={{ fontSize: "21px" }} />
                <Link to="#" underline="none" m={2} sx={{ marginTop: "10px" }}>
                  {employerProfile.socialProfile.twitterId}
                </Link>
              </Grid>
            </Grid>
            <Grid
              xs={6}
              container
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Stack>
                <Typography variant="h5" mt={1} gutterBottom>
                  Bank Account
                </Typography>
              </Stack>
              <Divider />
              <Grid
                item
                container
                sx={{ flexDirection: "column", padding: "10px" }}
              >
                <Typography variant="h6" mt={1} gutterBottom>
                  Khalti Name
                </Typography>
                <Typography variant="body1" ml={1}>
                  {employerProfile.bankAcc.khaltiName}
                </Typography>
              </Grid>
              <Grid
                item
                container
                sx={{ flexDirection: "column", padding: "10px" }}
              >
                <Typography variant="h6" mt={1} gutterBottom>
                  Khalti Id
                </Typography>
                <Typography variant="body1" ml={1}>
                  {employerProfile.bankAcc.khaltiId}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={3}
            sx={{ margin: 1, padding: "15px", width: "100%" }}
          >
            <Grid container sx={{ display: "flex", flexDirection: "column" }}>
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flex: "1",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" mt={1} gutterBottom>
                  Projects
                </Typography>
                <Link
                  to={"/postJob"}
                  state={employerProfile}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Button
                    // onClick={() => navigate("/postJob")}
                    variant="outlined"
                    sx={{ margin: "5px" }}
                  >
                    Post a Job
                  </Button>
                </Link>
              </Stack>
              <Divider />
              <Grid item xs={12} container>
                <List style={{ flex: 1 }}>
                  {employerProfile.posts.map((item, i) => (
                    <ListItem
                      key={i}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#D3D3D3",
                        },
                      }}
                      divider
                      disablePadding
                    >
                      <Link
                        to={`/project/edit/${item._id}`}
                        style={{
                          textDecoration: "none",
                          flex: 1,
                          color: "black",
                        }}
                      >
                        <ListItemButton
                          style={{
                            alignItems: "flex-start",
                          }}
                        >
                          <Grid item container spacing={1}>
                            <Grid item xs={8} container direction="column">
                              <h4>{item.title}</h4>
                              <Typography
                                variant="body1"
                                sx={{
                                  whiteSpace: "nowrap",
                                  color: "GrayText",
                                  overflow: "hidden",
                                  width: "250px",
                                  textOverflow: "ellipsis",
                                  padding: "0px 0px 10px 0px",
                                }}
                              >
                                {item.description}
                              </Typography>
                              <Grid
                                item
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <h6>
                                  <strong>Skills Required- </strong>
                                  {item.skillsRequirement.map((skill, i) =>
                                    item.skillsRequirement.length - 1 !== i
                                      ? `${skill} , `
                                      : skill
                                  )}
                                </h6>
                              </Grid>
                              <Grid item sx={{ padding: "5px 0px 0px 0px" }}>
                                <Box>
                                  <strong>Experience: </strong>
                                  {item.experiencedLevel}
                                </Box>
                              </Grid>
                              <Grid item sx={{ padding: "5px 0px" }}>
                                <Box>
                                  <strong>Category:</strong> {item.category}
                                </Box>
                              </Grid>
                              <Grid
                                item
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Rating
                                  name="half-rating-read"
                                  value={5}
                                  precision={0.5}
                                  readOnly
                                />
                                <p
                                  style={{
                                    paddingLeft: "5px",
                                    marginTop: "16px",
                                  }}
                                >
                                  {/* {item.reviews} */}5
                                </p>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                flexDirection: "column !important",
                                alignItems: "flex-end",
                              }}
                            >
                              <Box>Rs. {item.price}</Box>
                              <Box>{moment(item.createdAt).fromNow()}</Box>
                            </Grid>
                          </Grid>
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ) : (
        <Typography></Typography>
      )}
    </Container>
  );
};

export default EmployerDashboard;