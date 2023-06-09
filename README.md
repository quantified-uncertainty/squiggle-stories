## About

This repository contains a story about relative values. It is built on top of [this nextjs/squiggle integration template](). 

## Roadmap

### Storytelling-wise

For this release:

- [x] Sketch how the output will look
- [x] Get a skeleton working
- [x] Add a few estimates of value of consumption
- [x] Build alternative optimization function. Maybe iterate though all possible choices.
- [x] Add disclaimer about consumer choices being a limited but fruitful frame. 
- [x] Add something so that consumption adds up to ~3k?

For future work:

- [ ] Add estimates of alternatives to consumption
  - [ ] Using a cool relative values graph
  - [ ] Using a relative values table
  - [ ] Find out whether my preferences are cyclic? My marginal 5k of consumption > Saving for the option value > Donating to charity > My marginal 5k of consumption?
- [ ] Relative values over career options.
  - [ ] Relative values in general.
  - [ ] Relative values taking into account personal fit.
- [ ] Conclusion, reflection, comparison with foretold.
- Misc issues:
  - [ ] Look into "isCallback". Slava says: "But don't forget about useCallback, lack of it can kill React.memo optimization."
  - Look into autoresizing textarea components (that are controllable) <https://github.com/Andarist/react-textarea-autosize>
    - [x] Did a quickfix with countNumberOfLines instead
    - [ ] Could make the fix better by calculating numCols from window properties. 
- [ ] wrap mean(mixture(d)) into its own function, called something like numberOrDistributionIntoDistribution. 

### Technology-stack wise

- [ ] Push for a new release of Squiggle to be pushed to npm
- [ ] Adopt the new Squiggle release, which should be a bit more nifty.

## Built with

- [Nextjs](https://nextjs.org/)
- [Netlify](https://github.com/netlify/netlify-plugin-nextjs/#readme)
- [React](https://reactjs.org/)
- [Squiggle](https://www.squiggle-language.com/)


## Contributions and help

We welcome PR requests.

## License

Distributed under the MIT License. See LICENSE.txt for more information.

