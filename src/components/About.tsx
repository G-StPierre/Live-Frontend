import { useEffect, useState } from "react"
import "./About.css"
import { getUser } from "../services/UserService"

const About = (props: {username?: string} ) => {

    type ILinks = {
        youtube: string,
        twitter: string,
        instagram: string,
        discord: string,
        tiktok: string,
        website: string,
    }

    const [following, setFollowing] = useState<boolean>(false)
    const [links, setLinks] = useState<ILinks | null>(null)
    const [streamer, setStreamer] = useState<IUser | null>(null)


    const changeFollowing = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setFollowing(!following);
    }

    useEffect(() => {
        async function fetchData() {
            console.log("fetching data")
            const data = await getUser(props.username!);
            console.log(typeof(data))
            console.log(data); 
            setStreamer(data);
        }
        fetchData()
        setLinks({youtube: "https://www.youtube.com/channel/UCZ1ZkWQ7g9VTp5zYp0nB6ZQ", twitter: "https://twitter.com/DecembersTruly", instagram: "https://www.instagram.com/decemberstruly/", discord: "https://discord.gg/decemberstruly", tiktok: "https://www.tiktok.com/@decemberstruly", website: "https://decemberstruly.com"})
    }, [])


    return (
        <div className="about-container">
            <div className="bio-container">
                <h3>{streamer ? streamer.username : "Loading"}</h3>
                <p className="about-bio">{streamer ? streamer!.bio : "Loading"}</p>
            </div>
            <div className="about-extra">
                {links !== null &&
                <div className="links-container">
                    
                    {Object.entries(links!).map(([key, value], i) => {
                        return (
                            <div key={i} className="about-link-container"><a className="about-links" href={value.toString()}>{key}</a></div>
                        );
                        })}
                </div>
                }
                <div className="following-container">
                    <button onSubmit={(e) => changeFollowing(e)}>{(following ? "Unfollow" : "Follow")}</button>
                </div>
            </div>
        </div>
    )
}

export default About;