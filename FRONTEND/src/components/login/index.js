

function Login() {
    return (
        <form>
            <div className="form-control">
                <input type="text" id="firstname" name="email" placeholder="Nhập email của bạn" />
            </div>
            <div className="form-control">
                <input type="password" name="password" placeholder="Mật khẩu" id="password1" required />
            </div>
            <input type="submit" className="register" value="Đăng nhập" />
        </form>
    )
}

export default Login;