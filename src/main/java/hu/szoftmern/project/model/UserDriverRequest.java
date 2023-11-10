package hu.szoftmern.project.model;

import hu.szoftmern.project.model.User;
import hu.szoftmern.project.model.Driver;

public class UserDriverRequest {
    private User user;
    private Driver driver;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }
}
