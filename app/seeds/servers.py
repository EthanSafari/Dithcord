from app.models import db, Server, environment, SCHEMA, User


def seed_servers():

    server1 = Server(
        name = 'Mike Tyson Mysteries',
        server_image = 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSFe9ShSurjuKqi5axvhoY3162zMSRNn6yy66o3vKH9V-GkmocA8DjSJSYDnddMvjrYlGKwoLccdB7yk2c',
        owner_id = 1,
        private = False
    )

    server2 = Server(
        name = 'Boxing',
        server_image = 'https://bnz05pap002files.storage.live.com/y4myQ4UU9vEEbGHtAvRpm_GlMwt99tMbDidiSnRw9jp6UgWPohUi8yBQuKOEs1AAaPogd64A4CxPVNStDU0DxAuyN-hnTv_fkein1-QFoSATJGpUmfU4cV1j8gDKy_RbLIOaRAxp2jqh69fKCx9slcH_aDE1sNrQFn_uXm5dpAK12qewJjhvGn8kbcs17-Bi7u4oMtf4ANg6FQK53m3z7wtpt7M9sNsZKWvy5BqS6JPLtk?encodeFailures=1&width=424&height=373',
        owner_id = 2,
        private = False
    )

    server3 = Server(
        name = 'Tyson\'s Tigers',
        server_image = 'https://bnz05pap002files.storage.live.com/y4m67g_H2kiKbQyONzpAtEEq-X2rpG49sZjt1cgfMN9xEtQoKKlydz2CP4sDcQhJY10NSKetpOpCGCPMaTvqow0SXXGmRb1N0zDkZ21gYwr6Rs2Br2EtNIbnYH5wS6gbZmPSUpkQ5ygsj6NFb6VK73teh9MFCLDhmgrsdpJIbG5w_JJtbSbAMiKEYNQ6qD9ZZ9jukMsW9Awramlw-1p9GFhV9BKOzKZx450WFU4jOyybeA?encodeFailures=1&width=394&height=306',
        owner_id = 3,
        private = False
    )

    server4 = Server(
        name = 'Face Tattoos',
        server_image = 'https://bnz05pap002files.storage.live.com/y4m_amPq2a19ITgQi52NU0-qigl0cJbt1s7JFP8GUnCSwMV1Nhyizrv1f4ldrnwyP4HMuptn760amu4NH4ax5lFL8xTbYCmcyPPQdfdi5G9XMjzHE2UUx10NI8iI1MR0y73VRUP2ZGrL2bXMMrHVB98u9NFLB2lvhgSalUkvIlFJGXZ_sc0TdQJQRbm_BNc-okKYTHq0RoRbLku9Ph9fm6JaOtdo-ajyFl_VpgtHR4Owm8?encodeFailures=1&width=1566&height=956',
        owner_id = 4,
        private = False
    )

    all_servers = [ server1, server2, server3, server4 ]
    all_users = User.query.filter(User.id <= 5).all()
    for i in range(len(all_users)):
        for j in range(len(all_servers)):
            all_users[i].servers.append(all_servers[j])

    for server in all_servers:
        db.session.add(server)
    db.session.commit()

    print("Servers Seeded")


def undo_server():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers")

    db.session.commit()
