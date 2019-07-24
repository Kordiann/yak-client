export function getMoviesByTitle(phrase) {
    return `${'http://localhost:8080/movies?title='}${phrase}`;
}

export function getMovies(count) {
    return `${'http://localhost:8080/movies/search?count='}${count}`
}

export function getHomeMovies() {
    return `${'http://localhost:8080/movies/home?count=4'}`;
}

export function saveMovie(movieIMDBID, userName) {
    return `${'http://localhost:8080/movies/save/movie?movieIMDBID='}${movieIMDBID}${'&userName='}${userName}`;
}

export function register(login, password, email) {
    return `${'http://localhost:8080/users/add?'}${"userName="}${login}${"&password="}${password}${"&email="}${email}`
}

export function changePassword(userID, password, _password) {
    return `${'http://localhost:8080/users/user/change_password?userID='}${userID}${'&oldPassword='}${password}${'&newPassword='}${_password}`;
}

export function getUserByUserName(userName, userID) {
    return `${'http://localhost:8080/users/user?userName='}${userName}${'&userID='}${userID}`
}

export function getMovieById(movieIMDBID) {
    return `${'http://localhost:8080/movies/movie?id='}${movieIMDBID}`;
}

export function getAllUsers() {
    return `${'http://localhost:8080/users/all'}`;
}

export function getUserMovies(userID) {
    return `${'http://localhost:8080/users/user/movies?userID='}${userID}`;
}

export function sendFriendRequest(sender, recipient) {
    return `${'http://localhost:8080/friends/push?senderName='}${sender}${'&recipientName='}${recipient}`;
}

export function getUserFriends(userID) {
    return `${'http://localhost:8080/friends/userFriends?userID='}${userID}`;
}

export function getUsersWithoutID() {
    return `${'http://localhost:8080/friends/usersForUsersPage'}`;
}

export function getUsersForUsersPage(userID) {
    return `${'http://localhost:8080/friends/usersForUsersPage?userID='}${userID}`;
}