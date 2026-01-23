resource "aws_lb" "dailyfix_alb" {
  name               = "dailyfix-alb"
  load_balancer_type = "application"
  subnets            = [
    aws_subnet.public-1.id,
    aws_subnet.public-2.id
  ]
  security_groups    = [aws_security_group.alb_sg.id]

  tags = {
    Name = "dailyfix-alb"
  }
}


resource "aws_lb_target_group" "app_tg" {
  name     = "dailyfix-app-tg"
  port     = 8000
  protocol = "HTTP"
  vpc_id  = aws_vpc.dailyfix_vpc.id

  health_check {
    path                = "/health"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.dailyfix_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}
