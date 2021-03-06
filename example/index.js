import pb from '../src/Bootstrapper'
import sample1 from "url:./audio/samples/sample1.mp3"
import sample2 from "url:./audio/samples/sample2.mp3"
import sample3 from "url:./audio/samples/sample3.mp3"
import sample4 from "url:./audio/samples/sample4.mp3"
import sample5 from "url:./audio/samples/sample5.mp3"

function init() {

  var stage = new pb.Stage()
  var ctx = stage.getContext()

  var board = new pb.Board(ctx)
  stage.setBoard(board)

  var overdrive = new pb.stomp.Overdrive(ctx)
  var reverb = new pb.stomp.Reverb(ctx)
  var volume = new pb.stomp.Volume(ctx)
  var cabinet = new pb.stomp.Cabinet(ctx)
  var delay = new pb.stomp.Delay(ctx)

  board.addPedals([overdrive, delay, reverb, volume, cabinet])

  overdrive.setDrive(0.1)
  overdrive.setTone(0.4)
  overdrive.setLevel(0.6)
  volume.setLevel(1)
  reverb.setLevel(0.3)
  delay.setDelayTimer(0.2)
  delay.setFeedbackGain(0.7)

  stage.render(document.getElementById('floor'))

  /*

          Sample controls

       */
  var state = false

  var sampleAudios = [sample1, sample2, sample3, sample4, sample5]

  var cb = document.getElementById('controlButton')
  var samples = document.getElementsByClassName('sample')
  var sampleNo = 1
  samples = Array.prototype.slice.call(samples)
  var lb = document.getElementsByClassName('linein')[0]

  var playLineIn = function () {
    stage.stop()
    stage.input = new pb.io.StreamInput(stage.getContext())
    stage.input.on('loaded', () => stage.route())
  }

  lb.addEventListener(
    'click',
    function () {
      state = true
      sampleNo = 6
      cBDraw()
      settings[sampleNo - 1]()
      playLineIn()
    },
    false
  )
  var settings = []

  var cBDraw = function () {
    cb.innerHTML = state ? '&#9724;' : '&#9654;'
    samples.forEach(function (sample) {
      sample.className = 'sample'
    })
    samples[sampleNo - 1] && (samples[sampleNo - 1].className = 'sample on')

    sampleNo == 6 ? (lb.className = 'linein on') : (lb.className = 'linein')
  }

  var play = function () {
    if (sampleNo == 6) {
      playLineIn()
      return
    }
    settings[sampleNo - 1] && settings[sampleNo - 1]()
    stage.play(sampleAudios[sampleNo - 1])
  }

  var cBHandler = function () {
    state = !state
    cBDraw()
    stage.stop()
    if (state) play()
  }

  cb.addEventListener('click', cBHandler, false)

  samples.forEach(function (sample) {
    sample.addEventListener('click', function () {
      sampleNo = Array.prototype.slice.call(sample.parentNode.children).indexOf(sample) + 1
      state = true
      cBDraw()
      play()
    })
  })

  settings.push(function () {
    !overdrive.bypassSwitch.getState() && overdrive.bypassSwitch.toggle()
    overdrive.setLevel(1)
    overdrive.setDrive(0.1)
    overdrive.setTone(1)
    reverb.setLevel(1)
    !delay.bypassSwitch.getState() && delay.bypassSwitch.toggle()
    delay.setDelayTimer(0.6)
    delay.setFeedbackGain(0.5)
    delay.setLevel(0.7)
  })

  settings.push(function () {
    !overdrive.bypassSwitch.getState() && overdrive.bypassSwitch.toggle()
    overdrive.setLevel(0.6)
    overdrive.setDrive(0.25)
    overdrive.setTone(0.5)
    reverb.setLevel(0.3)
    delay.bypassSwitch.getState() && delay.bypassSwitch.toggle()
    delay.setDelayTimer(0)
    delay.setFeedbackGain(0)
    delay.setLevel(0)
  })

  settings.push(function () {
    !overdrive.bypassSwitch.getState() && overdrive.bypassSwitch.toggle()
    overdrive.setLevel(0.6)
    overdrive.setDrive(0.4)
    overdrive.setTone(0.5)
    reverb.setLevel(0.6)
    delay.bypassSwitch.getState() && delay.bypassSwitch.toggle()
    delay.setDelayTimer(0)
    delay.setFeedbackGain(0)
    delay.setLevel(0)
  })

  settings.push(function () {
    overdrive.bypassSwitch.getState() && overdrive.bypassSwitch.toggle()
    overdrive.setLevel(1)
    overdrive.setDrive(0)
    overdrive.setTone(0.1)
    reverb.setLevel(1)
    !delay.bypassSwitch.getState() && delay.bypassSwitch.toggle()
    delay.setDelayTimer(0.8)
    delay.setFeedbackGain(0.6)
    delay.setLevel(0.55)
  })

  settings.push(function () {
    !overdrive.bypassSwitch.getState() && overdrive.bypassSwitch.toggle()
    overdrive.setLevel(1)
    overdrive.setDrive(0.4)
    overdrive.setTone(0.3)
    reverb.setLevel(0.7)
    !delay.bypassSwitch.getState() && delay.bypassSwitch.toggle()
    delay.setDelayTimer(0.77)
    delay.setFeedbackGain(0.4)
    delay.setLevel(1)
  })

  settings.push(function () {
    overdrive.bypassSwitch.getState() && overdrive.bypassSwitch.toggle()
    overdrive.setLevel(1)
    overdrive.setDrive(0.1)
    overdrive.setTone(0.3)
    reverb.setLevel(0.7)
  })
}

document.body.addEventListener('click', init, { once: true })
