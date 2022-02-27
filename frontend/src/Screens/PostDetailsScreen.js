import React, { useState, useEffect } from "react";
import {
  Grow,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Box,
  CircularProgress,
  Button,
  InputAdornment,
  Input,
  TextField,
  Card,
  CardContent,
  CardActions,
  Modal,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import {
  getPostDetailsAction,
  postAcceptProposalAction,
  postDeleteAction,
  postFinishProposalAction,
} from "../actions/postActions";
import moment from "moment";
import {
  createTalentBidsAction,
  deleteTalentBidsAction,
  editTalentBidsAction,
  getTalentProfileByUserTalentIdAction,
} from "../actions/talentActions";
import { useForm } from "react-hook-form";
import { getEmployerProfileByEmployerIdAction } from "../actions/employerActions";
import Khalti from "../services/khalti";

const PostDetailsScreen = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.getPosts);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { talentProfile, loading: loadingTalentProfile } = useSelector(
    (state) => state.talentInfo
  );
  // const { employerProfile, loading: loadingEmployerProfile } = useSelector(
  //   (state) => state.employerInfo
  // );
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      biddingAmt: 0,
      proposalDescription: "",
      postId: "",
    },
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   console.log(post);

  const onSubmit = (inputData) => {
    inputData.postId = post._id;
    console.log(inputData);

    if (open) {
      console.log("edit bids");
      dispatch(
        editTalentBidsAction({
          inputData: inputData,
          id: talentProfile._id,
        })
      );
    } else {
      dispatch(
        createTalentBidsAction({
          inputData: inputData,
          id: talentProfile._id,
        })
      );
    }

    setValue("biddingAmt", 0);
    setValue("proposalDescription", "");
  };

  const handleDeletePost = () => {
    dispatch(
      postDeleteAction(
        {
          id: post._id,
        },
        navigate
      )
    );
  };

  const handleDeleteBid = () => {
    dispatch(
      deleteTalentBidsAction({
        id: talentProfile._id,
        postId: post._id,
      })
    );
  };

  const handleAcceptProposal = (talentId) => {
    // console.log(talentId);
    dispatch(
      postAcceptProposalAction(
        {
          talentId: talentId._id,
          postId: post._id,
        },
        navigate
      )
    );
  };

  const handleFinishProposal = (talentId) => {
    // console.log(talentId);
    dispatch(
      postFinishProposalAction(
        {
          talentId: talentId._id,
          postId: post._id,
        },
        navigate
      )
    );
  };

  useEffect(() => {
    if (userInfo.jobType === "Employer") {
      console.log("dispatching employer");
      // dispatch(
      //   getEmployerProfileByEmployerIdAction({
      //     id: userInfo._id,
      //   })
      // );
    } else {
      console.log("dispatching talent");
      dispatch(getTalentProfileByUserTalentIdAction({ id: userInfo._id }));
    }

    setEdit(location.pathname.split("/").includes("edit"));
    if (params.postId) {
      console.log("dispatching post");
      dispatch(getPostDetailsAction({ id: params.postId }));
    }
    // if (talentProfile && post) {
    //   console.log(talentProfile.bids.find((bid) => bid.postId === post._id));
    // }
  }, [location, dispatch, params, userInfo]);

  return (
    <Grow in>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid
            item
            container
            xs={12}
            sm={8}
            sx={{ flexDirection: "column", flex: "1" }}
          >
            <Box>
              <Paper sx={{ margin: "10px 0px", padding: "10px" }} elevation={4}>
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
                ) : post ? (
                  <Grid
                    item
                    container
                    sx={{
                      flexDirection: "column",
                      flex: "1",
                    }}
                  >
                    <Grid item container sx={{ marginBottom: "10px" }}>
                      <Grid item xs={12} md={8}>
                        <Typography variant="h4">Project Details</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: { md: "flex-end" },
                          paddingRight: "10px",
                          paddingTop: { xs: "8px" },
                        }}
                      >
                        <Box>
                          <strong>Rs.</strong> {post.price}
                        </Box>
                        <Box>posted {moment(post.createdAt).fromNow()}</Box>
                      </Grid>
                    </Grid>

                    <Divider />

                    <Typography
                      variant="h5"
                      sx={{ margin: "15px 0px 0px 0px" }}
                    >
                      <strong>{post.title.toUpperCase()}</strong>
                    </Typography>
                    <Typography variant="body" sx={{ margin: "10px 0px" }}>
                      <i>{post.description}</i>
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ margin: "10px 0px 0px 0px" }}
                    >
                      Skills Required
                    </Typography>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "0px 0px 10px 0px",
                      }}
                    >
                      {post.skillsRequirement.map((skill, index) => (
                        <Box
                          sx={{
                            border: "1px solid grey",
                            display: "flex",
                            borderRadius: "20px",
                            color: "grey",
                            padding: "10px",
                            height: "30px",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "6px",
                            "&:hover": {
                              border: "2px solid purple",
                              backgroundColor: "rgba(156, 39, 176, 0.3)",
                              color: "purple",
                            },
                          }}
                        >
                          <Typography variant="body2">{skill}</Typography>
                        </Box>
                      ))}
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        margin: "8px 0px 10px 0px",
                      }}
                    >
                      <Typography variant="h6" sx={{ marginRight: 1 }}>
                        ExperiencedLevel :-
                      </Typography>
                      <Typography variant="body1">
                        {post.experiencedLevel}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Grid item>
                        <p
                          style={{
                            fontSize: "11px",
                            color: "grey",
                            margin: "10px 0px",
                          }}
                        >
                          Project ID: {post._id}
                        </p>
                      </Grid>
                      {edit && post.employerId.userEmployerId === userInfo._id && (
                        <Grid item>
                          <Link
                            to={"/postJob/edit"}
                            state={post}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            <Button
                              variant="outlined"
                              sx={{ marginRight: "5px" }}
                            >
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outlined"
                            color="warning"
                            sx={{ marginRight: "5px" }}
                            onClick={handleDeletePost}
                          >
                            Delete
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                    {post.isPaid === false &&
                    post.employerId.userEmployerId === userInfo._id ? (
                      <Khalti postId={post._id} />
                    ) : (
                      <p
                        style={{
                          fontSize: "11px",
                          color: "grey",
                          margin: "10px 0px",
                        }}
                      >
                        Job has been paid to admin.You can accept talent.
                      </p>
                    )}
                  </Grid>
                ) : (
                  <Typography>No details!</Typography>
                )}
              </Paper>
            </Box>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={4}
            sx={{ flexDirection: "column", flex: "1" }}
          >
            <Paper sx={{ margin: "10px 0px", padding: "10px" }} elevation={4}>
              <Typography variant="h4">Client Details</Typography>
            </Paper>
          </Grid>
        </Grid>

        {loadingTalentProfile ? (
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
        ) : loading ? (
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
        ) : userInfo.jobType === "Talent" && talentProfile && post ? (
          <>
            <Box sx={{ width: "100%", margin: "auto" }}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Typography variant="h6" gutterBottom p={2}>
                      Place a Bid on this Project
                    </Typography>
                    <Divider />

                    <Typography
                      pl={3}
                      variant="body1"
                      sx={{
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      gutterBottom
                    >
                      You will be able to edit your bid until the project is
                      awarded to someone.
                    </Typography>
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "16px",
                          color: "black",
                          fontWeight: "600",
                        }}
                        gutterBottom
                      >
                        Bid Amount
                      </Typography>
                      <Input
                        variant="outlined"
                        fullWidth
                        {...register("biddingAmt", { required: true })}
                        startAdornment={
                          <InputAdornment
                            position="start"
                            sx={{ paddingRight: 2 }}
                          >
                            Rs.
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            Project Rate
                          </InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "16px", color: "black" }}
                        gutterBottom
                      >
                        Describe your proposal.
                      </Typography>
                      <TextField
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        {...register("proposalDescription", {
                          required: true,
                        })}
                      />
                    </Grid>
                    <Divider />
                    <Grid item xs={12} mt={2}>
                      <Button
                        disabled={
                          !!talentProfile.bids.find(
                            (bid) => bid.postId === post._id
                          )
                        }
                        variant="contained"
                        type="submit"
                      >
                        Place bid
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Box>
            {post.proposalSubmitted.map(
              (proposal) => talentProfile._id === proposal.talentId
            ) ? (
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5">Proposal submitted</Typography>
                <Divider />
                {post.proposalSubmitted.map((proposal) => (
                  <>
                    <Card variant="outlined" sx={{ marginTop: 3 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {proposal.talentId.profile.name}
                        </Typography>
                        <Typography variant="body" component="div">
                          {proposal.talentId.profile.email}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {proposal.proposalDescription}
                        </Typography>
                        <Typography variant="body2">
                          Rs.{proposal.biddingAmt}
                        </Typography>
                        <Typography variant="body2">
                          Accepted:{" "}
                          {proposal.isAccepted.toString() === true
                            ? "Yes"
                            : "No"}
                        </Typography>
                        <Typography variant="body2">
                          Finished:{" "}
                          {proposal.isFinished.toString() === true
                            ? "Yes"
                            : "No"}
                        </Typography>
                      </CardContent>
                      {talentProfile._id === proposal.talentId._id && (
                        <CardActions>
                          <Button onClick={handleOpen} size="small">
                            Edit
                          </Button>
                          <Button
                            onClick={handleDeleteBid}
                            size="small"
                            variant="text"
                            color="warning"
                          >
                            Delete
                          </Button>
                        </CardActions>
                      )}
                    </Card>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 400,
                          bgcolor: "background.paper",
                          border: "2px solid #000",
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Grid container spacing={2}>
                            <Typography variant="h6" gutterBottom p={2}>
                              Edit a Bid on this Project
                            </Typography>
                            <Divider />

                            <Typography
                              pl={3}
                              variant="body1"
                              sx={{
                                fontSize: "16px",
                                display: "flex",
                                alignItems: "center",
                              }}
                              gutterBottom
                            >
                              You will be able to edit your bid until the
                              project is awarded to someone.
                            </Typography>
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontSize: "16px",
                                  color: "black",
                                  fontWeight: "600",
                                }}
                                gutterBottom
                              >
                                Bid Amount
                              </Typography>
                              <Input
                                variant="outlined"
                                fullWidth
                                {...register("biddingAmt", { required: true })}
                                startAdornment={
                                  <InputAdornment
                                    position="start"
                                    sx={{ paddingRight: 2 }}
                                  >
                                    Rs.
                                  </InputAdornment>
                                }
                                endAdornment={
                                  <InputAdornment position="end">
                                    Project Rate
                                  </InputAdornment>
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                sx={{ fontSize: "16px", color: "black" }}
                                gutterBottom
                              >
                                Describe your proposal.
                              </Typography>
                              <TextField
                                label="Description"
                                multiline
                                rows={4}
                                fullWidth
                                {...register("proposalDescription", {
                                  required: true,
                                })}
                              />
                            </Grid>
                            <Divider />
                            <Grid item xs={12} mt={2}>
                              <Button variant="contained" type="submit">
                                Place bid
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      </Box>
                    </Modal>
                  </>
                ))}
              </Paper>
            ) : (
              <Typography></Typography>
            )}
          </>
        ) : post &&
          post.employerId.userEmployerId === userInfo._id &&
          userInfo.jobType === "Employer" ? (
          post.proposalSubmitted.map((proposal) => (
            <Paper key={proposal._id} elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h5">Proposal submitted</Typography>
              <Divider />
              <Card variant="outlined" sx={{ marginTop: 3 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {proposal.talentId.profile.name}
                  </Typography>
                  <Typography variant="body" component="div">
                    {proposal.talentId.profile.email}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {proposal.proposalDescription}
                  </Typography>
                  <Typography variant="body2">
                    Rs.{proposal.biddingAmt}
                  </Typography>
                  <Typography variant="body2">
                    Accepted:{" "}
                    {proposal.isAccepted.toString() === true ? "Yes" : "No"}
                  </Typography>
                  <Typography variant="body2">
                    Finished:{" "}
                    {proposal.isFinished.toString() === true ? "Yes" : "No"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleAcceptProposal(proposal.talentId)}
                    disabled={post.isPaid === false || post.isAccept === true}
                    size="small"
                  >
                    {proposal.isAccepted ? "Accepted" : "Accept"}
                  </Button>
                  {proposal.isAccepted && (
                    <Button
                      onClick={() => handleFinishProposal(proposal.talentId)}
                      disabled={
                        post.isPaid === false || proposal.isFinished === true
                      }
                      size="small"
                    >
                      {proposal.isFinished ? "Finished" : "Finish"}
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Paper>
          ))
        ) : (
          <Typography>No Proposal!!!</Typography>
        )}
      </Container>
    </Grow>
  );
};

export default PostDetailsScreen;