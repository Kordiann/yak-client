const baseURL = 'https://yak-server.herokuapp.com/';

export function getMoviesByTitle(phrase) {
    return `${baseURL}${'movies/?condition=s'}${'&phrase='}${phrase}`;
}

export function getMoviesByTitleWithUser(phrase, userID) {
    return `${baseURL}${'movies/?condition=s'}${'&phrase='}${phrase}${'&userID='}${userID}`;
}

export function getMovies() {
    return `${baseURL}${'movies/search'}`
}

export function getHomeMovies() {
    return `${baseURL}${'movies/home'}`;
}

export function saveMovie(movieIMDBID, userID) {
    return `${baseURL}${'movies/save/movie?imdbID='}${movieIMDBID}${'&userID='}${userID}`;
}

export function register(login, password, email) {
    return `${baseURL}${'users/add?'}${"userName="}${login}${"&password="}${password}${"&email="}${email}`
}

export function changePassword(userID, password, _password) {
    return `${baseURL}${'users/user/change_password?userID='}${userID}${'&oldPassword='}${password}${'&newPassword='}${_password}`;
}

export function getUserByUserName(userName, userID) {
    return `${baseURL}${'users/user?userName='}${userName}${'&userID='}${userID}`;
}

export function getMovieById(imdbID) {
    return `${baseURL}${'movies/?condition=i'}${'&phrase='}${imdbID}`;
}

export function getMovieByIdWithUser(imdbID, userID) {
    return `${baseURL}${'movies/?condition=i'}${'&phrase='}${imdbID}${'&userID='}${userID}`;
}

export function getAllUsers() {
    return `${baseURL}${'users/all'}`;
}

export function getUserMovies(userID) {
    return `${baseURL}${'users/user/movies?userID='}${userID}`;
}

export function sendFriendRequest(sender, recipient) {
    return `${baseURL}${'friends/push?senderName='}${sender}${'&recipientName='}${recipient}`;
}

export function getUserFriends(userID) {
    return `${baseURL}${'friends/userFriends?userID='}${userID}`;
}

export function getUsersWithoutID() {
    return `${baseURL}${'friends/usersForUsersPage'}`;
}

export function getUsersForUsersPage(userID) {
    return `${baseURL}${'friends/usersForUsersPage?userID='}${userID}`;
}

export function activateFriend(sender, recipient) {
    return `${baseURL}${'friends/activate?senderName='}${sender}${'&recipientName='}${recipient}`;
}

export function deleteFriendReq(sender, recipient) {
    return `${baseURL}${'friends/deleteReq?senderName='}${sender}${'&recipientName='}${recipient}`;
}

export function getUserMessages(sender) {
    return `${baseURL}${'messages/get/all?senderID='}${sender}`;
}

export function postMessage(sender, recipient, content) {
    return `${baseURL}${'messages/post?senderID='}${sender}${'&recipientID='}${recipient}${'&content='}${content}`;
}