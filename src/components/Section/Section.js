// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import PropTypes from 'prop-types';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';

const Section = ({ children, title, ...rest }) => (
  <Segment padded {...rest}>
    <Header as="h3">{title}</Header>
    {children}
  </Segment>
);

Section.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default Section;
