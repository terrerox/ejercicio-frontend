export const mapUsersData = (users) => {
    return users.map(user => {
        const { 
            id,
            firstname,
            lastname,
            email,
            displayname
        } = user

        return {
            id,
            firstname,
            lastname,
            email,
            displayname
        }
    })
}