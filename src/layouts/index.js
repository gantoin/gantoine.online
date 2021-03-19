import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql, Link, navigate, StaticQuery} from 'gatsby';
import Helmet from 'react-helmet';
import Swipeable from 'react-swipeable';
import {FaLinkedin} from "@react-icons/all-files/fa/FaLinkedin";
import {GrMail} from "@react-icons/all-files/gr/GrMail";
import Transition from '../components/transition';

import './index.css';

const Header = () => (
    <header>
        <Link to="https://www.linkedin.com/in/antoine-gauthier-767218a9/">
            <FaLinkedin className="logo"/><span> Linkedin</span>
        </Link>
        <Link to="/5">
            <span>Contact </span><GrMail className="logo"/>
        </Link>
    </header>
);

class TemplateWrapper extends Component {
    NEXT = [13, 32, 39];
    PREV = 37;

    swipeLeft = () => {
        this.navigate({keyCode: this.NEXT[0]});
    };

    swipeRight = () => {
        this.navigate({keyCode: this.PREV});
    };

    navigate = ({keyCode}) => {
        const now = this.props.data.slide.index;
        const slidesLength = this.props.slidesLength;

        if (now) {
            if (keyCode === this.PREV && now === 1) {
                return false;
            } else if (this.NEXT.indexOf(keyCode) !== -1 && now === slidesLength) {
                return false;
            } else if (this.NEXT.indexOf(keyCode) !== -1) {
                navigate(`/${now + 1}`);
            } else if (keyCode === this.PREV) {
                navigate(`/${now - 1}`);
            }
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.navigate);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.navigate);
    }

    render() {
        const {location, children, site} = this.props;

        return (
            <div>
                <Helmet
                    title={`${site.siteMetadata.title}`}
                />
                <Header
                    name={site.siteMetadata.name}
                    title={site.siteMetadata.title}
                    date={site.siteMetadata.date}
                />
                <Swipeable
                    onSwipedLeft={this.swipeLeft}
                    onSwipedRight={this.swipeRight}
                >
                    <Transition location={location}>
                        <div id="slide" style={{'width': '100%'}}>{children}</div>
                    </Transition>
                </Swipeable>
            </div>
        );
    }
}

TemplateWrapper.propTypes = {
    children: PropTypes.node,
    data: PropTypes.object,
};

export default props => (
    <StaticQuery
        query={graphql`
      query IndexQuery {
        site {
          siteMetadata {
            name
            title
            date
          }
        }
        allSlide {
          edges {
            node {
              id
            }
          }
        }
      }
    `}
        render={data => (
            <TemplateWrapper
                site={data.site}
                slidesLength={data.allSlide.edges.length}
                {...props}
            />
        )}
    />
);
