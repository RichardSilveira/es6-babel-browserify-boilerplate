function initClientOAuth2() {
    window.myClientOAuth2 = new ClientOAuth2Client.clientOAuth2({
        clientId: '2380',
        clientSecret: 'secret',
        accessTokenUri: 'http://idp-teste.tjmt.jus.br/connect/token',
        authorizationUri: 'http://idp-teste.tjmt.jus.br/connect/authorize',
        authorizationGrants: ['credentials'],
        redirectUri: 'http://localhost:3000/callback.html',
        scopes: 'openid'
    });
}

function getUriTokenWithCustomReplace() {
    var uri = myClientOAuth2.token.getUri().replace('token', 'code%20id_token%20token&nonce=123');

    console.log('uri: ', uri);
    return uri;
}

function callLoginUri() {
    window.location = getUriTokenWithCustomReplace();
}

function dameutoken(params) {
    myClientOAuth2.token.getToken(window.location.href)
        .then(function (user) {
            console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }

            // Make a request to the github API for the current user.
            // user.request({
            //     method: 'get',
            //     url: 'https://api.github.com/user'
            // }).then(function (res) {
            //     console.log(res) //=> { body: { ... }, status: 200, headers: { ... } }
            // })
        })
}
