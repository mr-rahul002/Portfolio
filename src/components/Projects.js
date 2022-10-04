import { Container, Row, Col } from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';
import colorSharp2 from '../assets/img/color-sharp2.png';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

import LiveCaption from '../assets/img/LiveCaption.png';
import student from '../assets/img/std.png';
import CP from '../assets/img/Cplayer.png';

export const Projects = () => {
	const projects = [
		{
			title: 'Generate Live Caption',
			description: `Mobile Application used to predict caption's from an Image. Image can be of any type. `,
			techStack: `Flutter, RedHat OpenShift(Container Imagge)`,
			sourceCode: `https://github.com/mr-rahul002/Generate-live-Caption`,
			imgUrl:LiveCaption ,
		},
	
		{
			title: 'Student DataBase Management System',
			description: `Developed a website which is used to store the students information in the database. Information of the student can be insert, read, modify, delete and take backup of the data in other drive(Folder). Before taking a backup mount the drive(where want to take backup).`,
			techStack: `C`,
			sourceCode: 'https://github.com/mr-rahul002/Student-Database-management-System',
			imgUrl: student,
		},
		{
			title: 'Code Player',
			description: `Develop a live web application in which you can write HTML, CSS, JavaScript`,
			techStack: `HTML, JavaScript, JQuery, CSS`,
			sourceCode: 'https://github.com/mr-rahul002/codePlayer',
			imgUrl: CP,
		}
	];


	return (
		<section className="project" id="projects">
			<Container>
				<Row>
					<Col size={12}>
						<TrackVisibility>
							{({ isVisible }) => (
								<div
									className={
										isVisible ? 'animate__animated animate__fadeIn' : ''
									}
								>
									<h2>Projects</h2>
									<Row>
										{projects.map((project, index) => {
											return <ProjectCard key={index} {...project} />;
										})}
									</Row>
									<p>
										<a
										href="https://github.com/mr-rahul002/"
                                        
											target="_blank"
											rel="noreferrer"
										>
											<p>
												Love to see more of my work ?
												<span>
													{'  '}
													<ArrowRightCircle size={25} />
												</span>
											</p>
										</a>
									</p>
								</div>
							)}
						</TrackVisibility>
					</Col>
				</Row>
			</Container>
			<img
				className="background-image-right"
				src={colorSharp2}
				alt="Background-img"
			></img>
		</section>
	);
};
