import { connect } from 'react-redux'
import styles from '../styles/Admin.module.css'
import adminActions from '../redux/actions/adminActions'
import { useEffect, useState } from 'react'

const AdminUsers = ({getUsers, manageAdmin, loginUser}) => {
const [users, setUsers] = useState([])
const [render, setRender] = useState(false)

    useEffect(() => {
        const res = async () => {
            let response = await getUsers()
            if (response.success) {
                setUsers(response.response)
            } else {
                console.log(response) // Falta mostrar el error
            }
        }
        res()
    }, [render])

    const giveRol = async (e) => {
        let action = e.target.dataset.admin === 'true'
        let response = await manageAdmin(e.target.id, loginUser.token, action)
        if (response.success) {
            setRender(!render)
        } else {
            alert('error') // Cambiar esto
        }
    }

    return (
        <div>
            <div>
                <h2>User list</h2>
                <div className={styles.searchBar}>
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search user.." />
                </div>
            </div>
            <div className={styles.userContainer}>
                {users.map((user) => {
                    return (
                        <div className={styles.userCard}>
                            <div>
                                <p className={user.admin ? styles.admin : null}>{user.eMail}</p>
                            </div>
                            <div>
                                <button onClick={giveRol} data-admin={user.admin} id={user._id} key={user.eMail}>{user.admin ? 'Remove admin' : 'Give admin'}</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        loginUser:state.users.user,
    }
}

const mapDispatchToProps = {
    getUsers: adminActions.getUsers,
    manageAdmin: adminActions.manageAdmin
}

export default  connect(mapStateToProps, mapDispatchToProps)(AdminUsers)