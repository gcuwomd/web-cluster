import Profile from "../Profile"
import PersonalStats from "../sider/PersonalStats"

const Main = () => {
  return (
    <>
      <div className="relative top-16 min-h-4/5 mt-5 mb-10 ">
        <div className="container mx-auto h-full flex flex-row gap-x-4">
          <div className="grow-2">
            <Profile />
          </div>
          <div className="grow">
            <PersonalStats />
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
