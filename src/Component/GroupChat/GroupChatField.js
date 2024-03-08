import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Refresh } from '@mui/icons-material';
import { Col, Row } from 'reactstrap';


export const GroupChatField = ({ handleChange, userName, text, allChat, handleSend, handleRefresh }) => {

  return (
    <>
      <div >
        <h1 className='heading'>Group Chat</h1>
      </div>
      <div >
        <div className="group_chat">
          <Row>
            <Col xl={12} lg={12} sm={12} md={12}>
              <div className="group_text">
                {allChat.length > 0 ? (
                  allChat.map((value) => (
                    <Row>
                      <Col xl={12} lg={12} sm={12} md={12}>
                        <div className="group_text">
                          {`[${value.date} ${value.time}] ${value.username} : ${value.text}`}
                        </div>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <span className="span">NO CHAT FOUND TO DISPLAY</span>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div >
        <Row>
          <Col xl={3} lg={3} md={3} xs={3} sm={3} style={{ textAlign: "right", paddingTop: "9px", }}
          >
            <span className="user_text" style={{ fontSize: "20px", fontWeight: "600", }}>{userName}</span>
          </Col>
          <Col xl={6} lg={6} md={6} xs={6} sm={6} style={{ textAlign: "center", paddingTop: "3px" }}
          >
            <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                }}
              >
                <TextField fullWidth
                  label=""
                  id="fullWidth"
                  color="secondary" focused
                  multiline
                  maxRows={4}
                  name="text"
                  value={text}
                  onChange={handleChange}
                  className="form-field"
                  type="text"
                />
              </Box>
            </div>

          </Col>
          <Col xl={3} lg={3} md={3} xs={3} sm={3} style={{ paddingTop: "6px" }}
          >
            <div>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleSend}>
                  Send
                </Button>
                <Button variant="contained" startIcon={<Refresh />} onClick={handleRefresh}>
                  Refresh
                </Button>

              </Stack>
            </div>
          </Col>
        </Row>
      </div >
    </>
  );
}
