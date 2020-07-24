import React, { Fragment, Component } from "react";
import { Header, Segment, Comment } from "semantic-ui-react";
import EventDetailChatForm from "./EventDetailChatForm";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

class EventDetailChat extends Component {
  state = { showReplyForm: false, selectedCopmmentId: null };

  handleOpenReplyForm = (id) => () => {
    this.setState({ showReplyForm: true, selectedCommentId: id });
  };

  handleCloseReplyForm = () => {
    this.setState({
      selectedCommentId: null,
      showReplyForm: false,
    });
  };

  render() {
    const { addEventComment, eventId, eventChat } = this.props;
    const { showReplyForm, selectedCommentId } = this.state;
    return (
      <Fragment>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: "none" }}
        >
          <Header>Chat about this event</Header>
        </Segment>
        <Segment attached>
          {eventChat &&
            eventChat.map((comment) => (
              <Comment.Group key={comment.id}>
                <Comment>
                  <Comment.Avatar
                    src={comment.photoURL || "/assets/user.png"}
                  />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{formatDistance(comment.date, Date.now())}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={this.handleOpenReplyForm(comment.id)}
                      >
                        {showReplyForm && selectedCommentId === comment.id && (
                          <EventDetailChatForm
                            addEventComment={addEventComment}
                            eventId={eventId}
                            form={`reply_${comment.id}`}
                            closeForm={this.handleCloseReplyForm}
                            parentId={comment.id}
                          />
                        )}
                        Reply
                      </Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>

                  {comment.childNodes &&
                    comment.childNodes.map((child) => (
                      <Comment.Group>
                        <Comment key={child.id}>
                          <Comment.Avatar
                            src={child.photoURL || "/assets/user.png"}
                          />
                          <Comment.Content>
                            <Comment.Author
                              as={Link}
                              to={`/profile/${child.uid}`}
                            >
                              {child.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                              <div>
                                {formatDistance(child.date, Date.now())}
                              </div>
                            </Comment.Metadata>
                            <Comment.Text>{child.text}</Comment.Text>
                            <Comment.Action
                              onClick={this.handleOpenReplyForm(child.id)}
                              style={{ width: "100%" }}
                            >
                              {showReplyForm &&
                                selectedCommentId === child.id && (
                                  <EventDetailChatForm
                                    addEventComment={addEventComment}
                                    eventId={eventId}
                                    form={`reply_${child.id}`}
                                    closeForm={this.handleCloseReplyForm}
                                    parentId={child.parentId}
                                  />
                                )}
                              Reply
                            </Comment.Action>
                          </Comment.Content>
                        </Comment>
                      </Comment.Group>
                    ))}
                </Comment>
              </Comment.Group>
            ))}
          <EventDetailChatForm
            parentId={0}
            addEventComment={addEventComment}
            eventId={eventId}
            form={"newComment"}
          />
        </Segment>
      </Fragment>
    );
  }
}

export default EventDetailChat;
