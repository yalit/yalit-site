import {AppImage} from "@/components/appImage";
import Icon500px from "@/components/icons/500px";
import GithubIcon from "@/components/icons/github";
import InstagramIcon from "@/components/icons/instagram";
import LinkedinIcon from "@/components/icons/linkedin";
import classnames from "@/lib/classnames";

export default function Index() {
    return (
        <>
            <div className="summary">
                <div className="title">
                    <p>Developer</p>
                    <p className="ml-10">Analyst</p>
                    <p className="ml-20">Project manager</p>
                </div>
                <div className="description">
                    <div>
                        <p>
                            I&apos;m Yannick, a <span className="font-bold">developer</span>
                            , <span className="font-bold">analyst</span>, and{" "}
                            <span className="font-bold">project manager</span>. I have a
                            passion for technology and I love to find solutions and build
                            things. I have a strong background in software development,
                            project management and business analysis. I have worked in
                            various industries including finance, insurance, and healthcare.
                            I thrive in a fast-paced environment and I am always looking for
                            new challenges.
                            <br/>
                            My goto technological stack is{" "}
                            <a href="https://react.dev/">React</a>
                            &nbsp;and <a href="https://www.symfony.com">Symfony</a>, and I
                            have experience with other technologies as well (Svelte,
                            Wordpress, Drupal, Next, Python ...). I am always looking to
                            learn new things and I am open to new opportunities.
                        </p>
                        <AppImage
                            classname="rounded_img rotate-2 min-w-[200px] min-h-[200px]"
                            src="index/code.jpg"
                            alt="Computer with code and a notebook"
                        />
                    </div>
                </div>
                <div className="socials mt-8 flex items-center justify-end gap-3">
                    <a
                        href="https://www.linkedin.com/in/yannickalsberge"
                        target="_blank"
                    >
                        <LinkedinIcon/>
                    </a>
                    <a href="https://github.com/yalit" target="_blank">
                        <GithubIcon/>
                    </a>
                    <a href="https://500px.com/p/rever1es" target="_blank">
                        <Icon500px/>
                    </a>
                    <a
                        href="https://www.instagram.com/reveries_photos/"
                        target="_blank"
                    >
                        <InstagramIcon/>
                    </a>
                </div>
            </div>

            <div className={"banner"}>
                <AppImage
                    classname={classnames(
                        "bannerImage",
                        "-rotate-3",
                        "min-w-[200px] min-h-[200px]",
                    )}
                    imgClassname={classnames(
                        "bannerImage",
                        "min-w-[200px] min-h-[200px]",
                    )}
                    src="index/coast.jpg"
                    alt="Coast with cliffs and nature"
                />
                <AppImage
                    classname={classnames(
                        "bannerImage",
                        "rotate-2",
                        "min-w-[200px] min-h-[200px]",
                    )}
                    imgClassname={classnames(
                        "bannerImage",
                        "min-w-[200px] min-h-[200px]",
                    )}
                    src="index/cow.jpg"
                    alt="Cow portrait"
                />
                <AppImage
                    classname={classnames(
                        "bannerImage",
                        "-rotate-1",
                        "min-w-[200px] min-h-[200px]",
                    )}
                    imgClassname={classnames(
                        "bannerImage",
                        "min-w-[200px] min-h-[200px]",
                    )}
                    src="index/source.jpg"
                    alt="bublling source of water"
                />
                <AppImage
                    classname={classnames(
                        "bannerImage",
                        "rotate-2",
                        "min-w-[200px] min-h-[200px]",
                    )}
                    imgClassname={classnames(
                        "bannerImage",
                        "min-w-[200px] min-h-[200px]",
                    )}
                    src="index/wood_nb.jpg"
                    alt="road bewteen trees in black and white"
                />
                <AppImage
                    classname={classnames(
                        "bannerImage",
                        "-rotate-3",
                        "min-w-[200px] min-h-[200px]",
                    )}
                    imgClassname={classnames(
                        "bannerImage",
                        "min-w-[200px] min-h-[200px]",
                    )}
                    src="index/tree_light.jpg"
                    alt="sun light through trees"
                />
            </div>
        </>
    );
}
