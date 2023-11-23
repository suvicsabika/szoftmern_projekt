// UserDriverRequest osztály: Felhasználó és sofőr kérések kezelésére szolgál a rendszerben.

package hu.szoftmern.project.model;

import hu.szoftmern.project.model.User;
import hu.szoftmern.project.model.Driver;

public class UserDriverRequest {
    private User user;
    private Driver driver;

    // getUser: Visszaadja a felhasználó objektumot
    public User getUser() {
        return user;
    }

    // setUser: Beállítja a felhasználó objektumot
    public void setUser(User user) {
        this.user = user;
    }

    // getDriver: Visszaadja a sofőr objektumot
    public Driver getDriver() {
        return driver;
    }

    // setDriver: Beállítja a sofőr objektumot
    public void setDriver(Driver driver) {
        this.driver = driver;
    }
}
