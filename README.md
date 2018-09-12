# Part 1

### Installation

After cloning the repo

##### Server

`cd server && npm run build`

##### Client

Created with create-react-app. Follow `./client/README.md`

### Running

In order to run the examples, you have to use two separate terminal tabs.

##### Server

`cd server && npm run dev`

##### Client

`cd client && npm start`

# Part 2

```
// A developer has written some code and submitted a pull request. The PR adds functionality to
// enable users to invite other users to their personal shops. The code is shown below.

// ● req ​and res ​are the express request and response objects
// ● superagent ​is an NPM module that makes http

// ● What do you think is wrong with the code, if anything?
// ● Can you see any potential problems that could lead to unexpected behaviour?
// ● How might you refactor this code to:
// ○ Make it easier to read
// ○ Increase code reuse
// ○ Improve the testability
// ○ Minimize unhandled exceptions

// POST /api/invite/:shopId
// body {email: 'heyguys@heyguys.com'}

// User
// {_id, authId, email}

// Shop
// {_id, invitation, users}

exports.inviteUser = function(req, res) {
  var invitationBody = req.body;
  var shopId = req.params.shopId;
  var authUrl = 'https://url.to.auth.system.com/invitation';

  // what if i get a shopId for a shop that's not mine?
  // how does auth know what shop to send the invitation to?

  superagent
    .post(authUrl)
    .send(invitationBody)
    .end(function(err, invitationResponse) {
      if (invitationResponse.status === 201) {
        // if invitation is created in my auth server, i update or create the user in my system
        // with his email and authId, and return the new user
        User.findOneAndUpdate(
          {
            authId: invitationResponse.body.authId
          },
          {
            authId: invitationResponse.body.authId,
            email: invitationBody.email
          },
          {
            upsert: true,
            new: true
          },
          function(err, createdUser) {
            // why not make shop query before all the logic. if shop doesn't exist
            // (or not mine!)
            // or I somehow get an error while I query, i exit anyway. this should be the
            // first step
            Shop.findById(shopId).exec(function(err, shop) {
              if (err || !shop) {
                return res
                  .status(500)
                  .send(err || { message: 'No shop found' });
              }
              // I check if I have the invitationId in my shop invitations and I add it
              // again
              if (
                shop.invitations.indexOf(invitationResponse.body.invitationId)
              ) {
                shop.invitations.push(invitationResponse.body.invitationId);
              }
              // shop.users an array of user._id? so why push my whole user object
              if (shop.users.indexOf(createdUser._id) === -1) {
                shop.users.push(createdUser);
              }
              // save the shop with the new user and double the invitationId
              shop.save();
            });
          }
        );
      } else if (invitationResponse.status === 200) {
        // invitation API returns OK status, means user already in the shop?
        res.status(400).json({
          error: true,
          message: 'User already invited to this shop'
        });
        return;
      }
      res.json(invitationResponse);
    });
};
```

##### Recommendations

- shop owner posts to my invitations endpoint with a body of {email} and a shopId param
  `app.post('/invitations/:shopId', shopRequired, inviteUser)`

- i check if shop exists and if it belongs to the authenticated user, else i return error - maybe handle this in some middleware before my invite user function, add shop to my req object

- i make a request to auth service to create user or check if the invited user is in the auth system

- if code == 201 Created -> user is new, i create user into my own system
  (can user exist in my system without being already in the auth system, do i need to update?)

- if code == 200 OK -> user is already in the system

- if user is not in owner's shop pending invites, add to pending invite, save shop, return new shop, else return error user already invited to this shop

- later, if user accepts invitation, remove from pending invites, add to shop

- use async/await for better control flow
- use middleware for decluttering route logic
- maybe use express route error handler if anything goes wrong
